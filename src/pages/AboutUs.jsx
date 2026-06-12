import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import "../styles/CardsStyle.css";

export default function AboutUs() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavBar />
      <div style={{ flex: 1 }}>
        <Cards />
      </div>
      <Footer />
    </div>
  );
}
