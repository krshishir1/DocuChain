import Navbar from "../components/Navbar";

const PageNotFound = () => {
  return (
    <>
      <Navbar />
      <div className="pt-36">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">404 Page Not Found</h1>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
