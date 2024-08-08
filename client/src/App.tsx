import { Header } from './components/header';
import { Main } from './components/main';
import { Footer } from './components/footer';
import { Dashboard } from './components/dashboard';

export const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Dashboard />
      </Main>
      <Footer />
    </>
  );
};
