import { Header } from './components/header';
import { Dashboard } from './components/dashboard';
import { Footer } from './components/footer';

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Dashboard />
      </main>
      <Footer />
    </>
  );
};
