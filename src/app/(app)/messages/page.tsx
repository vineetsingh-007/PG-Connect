'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { conversations as mockConversations } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Search, Send } from 'lucide-react';
import type { Conversation, Message } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0] || null);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !selectedConversation) return;

    const message: Message = {
      id: `m${Date.now()}`,
      text: newMessage,
      timestamp: new Date(),
      sender: 'owner',
    };

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessage: newMessage,
      lastMessageTimestamp: new Date(),
    };

    setSelectedConversation(updatedConversation);
    setConversations(conversations.map(c => c.id === updatedConversation.id ? updatedConversation : c));
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
         <div>
            <h1 className="text-2xl font-bold font-headline">Messages</h1>
            <p className="text-sm text-muted-foreground">Your conversations with students.</p>
        </div>
      </div>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 h-full overflow-hidden">
        {/* Conversation List */}
        <div className="md:col-span-1 xl:col-span-1 border-r flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9" />
            </div>
          </div>
          <ScrollArea className="flex-grow">
            {conversations.map(convo => (
              <button
                key={convo.id}
                onClick={() => setSelectedConversation(convo)}
                className={cn(
                  'w-full text-left p-4 flex gap-4 items-start border-b hover:bg-muted/50 transition-colors',
                  selectedConversation?.id === convo.id && 'bg-muted'
                )}
              >
                <Avatar className="h-11 w-11 border">
                  <AvatarImage src={convo.userAvatar} data-ai-hint="person portrait" />
                  <AvatarFallback>{convo.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{convo.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(convo.lastMessageTimestamp, { addSuffix: true })}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{convo.listingName}</p>
                  <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 xl:col-span-3 flex flex-col h-full bg-background">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={selectedConversation.userAvatar} data-ai-hint="person portrait" />
                  <AvatarFallback>{selectedConversation.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedConversation.userName}</p>
                  <p className="text-sm text-muted-foreground">Regarding: {selectedConversation.listingName}</p>
                </div>
              </div>

              <ScrollArea className="flex-grow p-4 md:p-6">
                <div className="space-y-4">
                  {selectedConversation.messages.map(msg => (
                    <div
                      key={msg.id}
                      className={cn(
                        'flex gap-2',
                        msg.sender === 'owner' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'p-3 rounded-2xl max-w-sm',
                          msg.sender === 'owner'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-muted rounded-bl-none'
                        )}
                      >
                        <p>{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t bg-muted/50">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    className="flex-grow bg-background"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
