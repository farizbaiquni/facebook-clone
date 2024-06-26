type AlertMessageTopRightProps = {
  topic: string;
  description: string;
  bgTextBorderColor: string;
  widthInPixel?: number;
  setIsAlert(param: boolean): void;
};

const AlertMessageTopRight = ({
  topic,
  description,
  widthInPixel = 400,
  bgTextBorderColor,
  setIsAlert,
}: AlertMessageTopRightProps) => {
  return (
    <div
      className="w-full-h-full fixed inset-0 z-50 bg-black bg-opacity-30"
      onClick={() => setIsAlert(false)}
    >
      <div
        className={`fixed right-10 top-5 w-[${widthInPixel.toString()}px] cursor-pointer border-l-4 p-4 shadow-2xl ${bgTextBorderColor}`}
        role="alert"
      >
        <p className="font-extrabold">{topic}</p>
        <p className="mt-1">{description}</p>
      </div>
    </div>
  );
};

export default AlertMessageTopRight;
