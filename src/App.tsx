import { Button } from "@/components/ui/button";
import { BrowserRouter } from "react-router-dom";
import Layout from "@/components/layout";
import { ThemeProvider } from "./context/theme-provider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>Hello</Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
