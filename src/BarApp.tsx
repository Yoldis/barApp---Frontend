import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthProvider";
import { BarProvider } from "./context/BarProvider";
import { Toaster } from "sonner";

const BarApp = () => {

  return (
    <>
      <AuthProvider>
        <BarProvider>
          <BrowserRouter>
            <Toaster/>
            <AppRouter />
          </BrowserRouter>
        </BarProvider>
      </AuthProvider>
    </>
  );
}

export default BarApp;
