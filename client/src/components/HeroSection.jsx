const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <img
        src="/assets/main-image.jpeg"
        className="h-screen w-screen object-cover"
        alt="Main"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <div className="text-2xl font-bold mb-4">안심식당 예약 시스템</div>
        <div className="text-lg mb-6">
          안전한 식사, 안심테이블에서 예약하고 편안한 시간을 즐기세요!
        </div>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          안심식당 찾기
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
