import httpx
import asyncio
import numpy as np
from app.embed import embed_text

def cosine_similarity(vec1,vec2):
    v1,v2=np.array(vec1),np.array(vec2)
    return float(np.dot(v1,v2)/(np.linalg.norm(v1)* np.linalg.norm(v2)))

async def fetch_stackoverflow_results(query:str):
    url = "https://api.stackexchange.com/2.3/search/advanced"
    params = {
        "order": "desc",
        "sort": "relevance",
        "q": query,
        "site": "stackoverflow",
        "accepted": True,
        "pagesize": 3,
        "filter": "withbody"
    }

    async with httpx.AsyncClient() as client:
        res=await client.get(url,params=params)
        data= res.json()
    
    results=[]

    for item in data.get("items",[]):
        results.append({
            "title": item["title"],
            "url": item["link"],
            "content": item.get("body", "")
        })

    return results

async def fetch_github_issues(query:str):
    url = "https://api.github.com/search/issues"
    headers = {
        "Accept": "application/vnd.github+json",
    }
    params = {
        "q": f"{query} in:title,body type:issue state:open",
        "per_page": 3,
    }
    async with httpx.AsyncClient() as client:
        res = await client.get(url, params=params, headers=headers)
        data = res.json()

    results = []
    for item in data.get("items", []):
        results.append({
            "title": item["title"],
            "url": item["html_url"],
            "content": item.get("body", "")
        })

    return results


async def fetch_fallback_sources(error: str):
    so_task = fetch_stackoverflow_results(error)
    gh_task = fetch_github_issues(error)

    so_results, gh_results = await asyncio.gather(so_task, gh_task)
    all_results = so_results + gh_results

    query_vec = embed_text(error)

    for result in all_results:
        result_vec = embed_text(result["content"])
        result["score"] = cosine_similarity(query_vec, result_vec)

    return sorted(all_results, key=lambda x: x["score"], reverse=True)
