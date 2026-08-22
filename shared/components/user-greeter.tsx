"use client";

import { useSyncExternalStore } from "react";
import { authClient } from "../lib/auth/auth-client";

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

const UserGreeter = () => {
  const { data: session, isPending } = authClient.useSession();
  const greeting = useSyncExternalStore(
    subscribe,
    getClientGreeting,
    getServerGreeting,
  );

  const userName = session?.user?.name || "there";

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <span className='text-sm font-medium text-muted-foreground'>
      {greeting}, {userName}!
    </span>
  );
};

export default UserGreeter;
