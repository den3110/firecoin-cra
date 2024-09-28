import "./App.css";
import RootLayout from "./providers/RootLayout";
import LandingLayout from "./app/[locale]/(landing)/layout";
import './i18n'

function App() {
  return (
    <RootLayout>
      <LandingLayout>
        {/* Nội dung của các trang sẽ được render tại đây */}
        <div>Hello world</div>
      </LandingLayout>
    </RootLayout>
  );
}

export default App;
