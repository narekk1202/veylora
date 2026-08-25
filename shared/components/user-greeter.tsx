"use client";

import { User } from "better-auth";
import { useSyncExternalStore } from "react";

function getGreeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}

function subscribe() {
  return () => {};
}

function getClientGreeting() {
  return getGreeting(new Date().getHours());
}

function getServerGreeting() {
  return "Hello";
}

type UserGreeterProps = {
  user: User;
};

const UserGreeter = ({ user }: UserGreeterProps) => {
  const greeting = useSyncExternalStore(
    subscribe,
    getClientGreeting,
    getServerGreeting,
  );

  const userName = user.name || "there";

  return (
    <span className="text-muted-foreground text-sm font-medium">
      {greeting}, {userName}!
    </span>
  );
};

export default UserGreeter;
