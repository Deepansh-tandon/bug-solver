import asyncio
from app.core import solve_error

async def test_error_solver():
    # Test case 1: Common Python error
    error1 = "TypeError: 'NoneType' object is not callable"
    print("\nTesting error 1:", error1)
    result1 = await solve_error(error1)
    print("\nSource:", result1["source"])
    print("\nTop 5 Matches:")
    for i, match in enumerate(result1["matches"], 1):
        print(f"\n{i}. Score: {match['score']:.2f}")
        print(f"Title: {match['title']}")
        print(f"URL: {match['url']}")
    print("\nSummary:")
    print(result1["summary"])

    # Test case 2: Another common error
    error2 = "ModuleNotFoundError: No module named 'requests'"
    print("\n\nTesting error 2:", error2)
    result2 = await solve_error(error2)
    print("\nSource:", result2["source"])
    print("\nTop 5 Matches:")
    for i, match in enumerate(result2["matches"], 1):
        print(f"\n{i}. Score: {match['score']:.2f}")
        print(f"Title: {match['title']}")
        print(f"URL: {match['url']}")
    print("\nSummary:")
    print(result2["summary"])

if __name__ == "__main__":
    asyncio.run(test_error_solver()) 