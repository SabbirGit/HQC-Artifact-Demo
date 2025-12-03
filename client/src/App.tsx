import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import { ToastProvider } from "@/hooks/use-toast";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Dashboard />
      </Route>
      <Route path="/orchestrator">
        <Dashboard defaultTab="orchestration" />
      </Route>
      <Route path="/governance">
        <Dashboard defaultTab="governance" />
      </Route>
      <Route path="/value">
        <Dashboard defaultTab="value" />
      </Route>
      <Route path="/adaptability">
        <Dashboard defaultTab="adaptability" />
      </Route>
      <Route path="/settings">
        <Dashboard defaultTab="overview" />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ToastProvider>
          <Toaster />
          <Router />
        </ToastProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
