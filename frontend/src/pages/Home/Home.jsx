import Navbar from "../../components/Navbar/Navbar";
import ImageUploader from "../../components/ImageUploader/ImageUploader";

function Home() {
  return (
    <div className="app">
      <Navbar />

      <main className="home">
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">AI POWERED IMAGE ANALYSIS</p>

            <h1>
              Understand your
              <span> images with AI.</span>
            </h1>

            <p className="hero-description">
              Upload an image and let artificial intelligence analyze it
              and provide meaningful results.
            </p>

            <ImageUploader />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;