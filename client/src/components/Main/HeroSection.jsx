import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      <img
        src="/assets/main-image.jpeg"
        className="h-screen w-screen object-cover"
        alt="Main"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <div className="text-5xl font-bold mb-6">안심식당 예약</div>
        <div className="text-2xl font-semibold mb-10">
          안전한 식사, 안심테이블에서 예약하고 편안한 시간을 즐기세요!
        </div>
        <button
          className="px-10 py-3 bg-white text-black text-lg font-semibold hover:bg-amber-100 rounded-full"
          onClick={() => navigate("/safetable")}
        >
          안심식당 보기
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
