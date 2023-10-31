# Network

Riseact backend do not throw errors. If user is not authenticated, it respond with a 200 with this payload:

```json
{
    "data": null,
    "errors": [
        {
            "message": "User is not authenticated",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "path"
            ]
        }
    ]
}
```