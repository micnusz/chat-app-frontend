"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockMessages = [
  {
    username: "Adam",
    content: "Are we still meeting today? What time works for you two?",
    timestamp: new Date("2025-02-04T16:22:00"),
    mine: false,
  },
  {
    username: "Ja",
    content: "Let’s do 19. Works best on my side.",
    timestamp: new Date("2025-02-04T16:36:00"),
    mine: true,
  },
  {
    username: "Jane",
    content: "19 works perfectly for me.",
    timestamp: new Date("2025-02-04T16:38:00"),
    mine: false,
  },
  {
    username: "Jane",
    content: "See you then!",
    timestamp: new Date("2025-02-04T16:38:00"),
    mine: false,
  },
];

const bubbleColors: Record<string, string> = {
  Adam: "bg-chart-2 text-foreground",
  Ja: "bg-primary text-foreground",
  Jane: "bg-chart-3 text-foreground",
};

export default function MockChatHero() {
  return (
    <div
      className="rounded-2xl bg-background  p-4 w-full max-w-[40rem]
      xs:w-[95%]
      sm:w-[90%]
      md:w-[32rem]
      lg:w-[38rem]
      xl:w-[40rem]"
    >
      <div className="flex flex-col gap-2 h-[70vh] max-h-[32rem]">
        <div className="flex-1 overflow-y-auto rounded-md border p-2 max-h-[26rem] bg-background">
          <div className="flex flex-col gap-y-1">
            {mockMessages.map((msg, idx) => {
              const isMine = msg.mine;
              const time = msg.timestamp.toLocaleTimeString("pl-PL", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });

              const prev = idx > 0 ? mockMessages[idx - 1] : null;
              const showHeader = !prev || prev.username !== msg.username;

              return (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    isMine ? "items-end" : "items-start"
                  }`}
                >
                  {showHeader && (
                    <div
                      className={`flex flex-row items-center gap-1 text-xs text-muted-foreground mb-1 ${
                        isMine ? "justify-end" : ""
                      }`}
                    >
                      {!isMine && (
                        <span className="font-semibold text-xs">
                          {msg.username} -
                        </span>
                      )}
                      <span>{time}</span>
                    </div>
                  )}

                  <div
                    className={`px-3 py-2 rounded-lg max-w-[80%] sm:max-w-[70%] md:max-w-[65%] break-words text-sm ${
                      bubbleColors[msg.username]
                    } ${isMine ? "rounded-br-none" : "rounded-bl-none"}`}
                  >
                    <p>{msg.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <Input
            type="text"
            placeholder="Type a message"
            className="flex-1 border rounded p-2"
            disabled
          />
          <Button variant="outline" disabled>
            Send
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-right">0/1000</div>
      </div>
    </div>
  );
}
