import React from "react";

const CVCGuide = () => {
  return (
    <div className="border rounded-md text-xs absolute w-8/12 p-3 top-0 left-36 bg-white">
      <h1 className="font-medium text-sm mb-1">CVC란?</h1>
      <p>
        카드 뒷면의 서명란에 인쇄된 숫자
        <span className="font-semibold">끝 3자리가</span>
      </p>
      <p className="mb-1">CVC 번호입니다.</p>
      <p>
        카드에 따라 카드 앞면의 번호{" "}
        <span className="font-semibold">오른쪽 또는 왼쪽 상단에 3~4자리</span>로
        기재된 경우도 있습니다.
      </p>
    </div>
  );
};

export default CVCGuide;
