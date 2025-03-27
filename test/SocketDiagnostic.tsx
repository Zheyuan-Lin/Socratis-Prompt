"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Socket } from "socket.io-client"

interface LogEntry {
  message: string;
  timestamp: string;
  type: 'info' | 'error' | 'warn' | 'success';
}

export default function SocketDiagnostic() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [serverUrl, setServerUrl] = useState("http://localhost:3000")
  const socketRef = useRef<Socket | null>(null)
  
  const addLog = (message: string, type: LogEntry['type'] = "info") => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0]
    setLogs(prev => [{ message, timestamp, type }, ...prev].slice(0, 100))
  }
  
  const connect = async () => {
    try {
      // Dynamically import socket.io-client to avoid SSR issues
      const { io } = await import('socket.io-client')
      
      // Disconnect existing socket if any
      if (socketRef.current) {
        socketRef.current.disconnect()
        addLog("Disconnected previous socket", "warn")
      }
      
      addLog(`Connecting to ${serverUrl}...`)
      
      const socket = io(serverUrl, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
        EIO: 4
      })
      
      socket.on('connect', () => {
        addLog(`Connected! Socket ID: ${socket.id}`, "success")
        setIsConnected(true)
      })
      
      socket.on('connect_error', (err) => {
        addLog(`Connection error: ${err.message}`, "error")
        console.error('Connection error:', err)
      })
      
      socket.on('disconnect', (reason) => {
        addLog(`Disconnected: ${reason}`, "warn")
        setIsConnected(false)
      })
      
      socket.on('reconnect_attempt', (attemptNumber) => {
        addLog(`Reconnection attempt #${attemptNumber}`, "warn")
      })
      
      // Listen for all server events
      socket.onAny((eventName, ...args) => {
        addLog(`Received '${eventName}' event: ${JSON.stringify(args)}`, "info")
      })
      
      socketRef.current = socket
    } catch (error) {
      addLog(`Error initializing socket: ${error.message}`, "error")
      console.error('Error initializing socket:', error)
    }
  }
  
  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect()
      addLog("Manually disconnected", "warn")
      setIsConnected(false)
    }
  }
  
  const sendTestMessage = () => {
    if (!socketRef.current || !isConnected) {
      addLog("Cannot send message - not connected", "error")
      return
    }
    
    // Test the receive_external_question event
    const questionData = {
      text: "Test message from diagnostic tool",
      id: Date.now().toString()
    }
    
    addLog(`Sending 'receive_external_question': ${JSON.stringify(questionData)}`)
    socketRef.current.emit("receive_external_question", questionData)
    
    // Test the on_interaction event with custom_message
    const interactionData = {
      appMode: "default",
      appType: "CONTROL",
      appLevel: "live",
      participantId: "diagnostic-" + Date.now(),
      interactionType: "custom_message",
      message: "Test interaction message"
    }
    
    addLog(`Sending 'on_interaction': ${JSON.stringify(interactionData)}`)
    socketRef.current.emit("on_interaction", interactionData)
  }
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Socket.IO Diagnostic Tool</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Server URL</label>
            <input 
              type="text" 
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
              className="w-full p-2 border rounded"
              disabled={isConnected}
            />
          </div>
          
          <div className="flex space-x-2 mb-4">
            <Button
              onClick={connect}
              disabled={isConnected}
              className="flex-1"
            >
              Connect
            </Button>
            
            <Button
              onClick={disconnect}
              disabled={!isConnected}
              variant="outline"
              className="flex-1"
            >
              Disconnect
            </Button>
          </div>
          
          <Button
            onClick={sendTestMessage}
            disabled={!isConnected}
            className="w-full mb-4"
          >
            Send Test Messages
          </Button>
          
          <div className={`p-3 rounded-md ${isConnected ? 'bg-green-100' : 'bg-red-100'}`}>
            <div className="font-medium">
              Status: {isConnected ? 'Connected' : 'Disconnected'}
            </div>
            {isConnected && socketRef.current && (
              <div className="text-sm mt-1">
                Socket ID: {socketRef.current.id}
              </div>
            )}
          </div>
        </div>
        
        <div className="h-96 overflow-y-auto border rounded p-3 bg-gray-50">
          <h2 className="font-medium mb-2">Event Log</h2>
          {logs.map((log, i) => (
            <div
              key={i}
              className={`mb-1 text-sm font-mono p-1 rounded ${
                log.type === 'error' ? 'bg-red-100' :
                log.type === 'warn' ? 'bg-yellow-100' :
                log.type === 'success' ? 'bg-green-100' : ''
              }`}
            >
              <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-gray-500 italic">No logs yet. Connect to see events.</div>
          )}
        </div>
      </div>
    </div>
  )
}