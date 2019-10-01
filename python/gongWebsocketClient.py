#!/usr/bin/env python
import asyncio
import websockets

if __name__ == '__main__':
    uri = "ws://localhost:8085"

    async def listen():
        async with websockets.connect(uri) as websocket:
            print('connected to ' + uri)
            while True:
                message = await websocket.recv()
                print('received ' + message)
                
                if (message == "ring"):
                    # cause gong to ring here
                    pass
                

    asyncio.get_event_loop().run_until_complete(listen())
    asyncio.get_event_loop().run_forever()