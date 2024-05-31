import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Comment() {
  const icons = [
    "/icons/posts/like.svg",
    "/icons/posts/love.svg",
    "/icons/posts/care.svg",
  ];

  return (
    <div className="group flex px-4 py-2">
      {/* Photo Profile */}
      <div className="mr-2 min-w-max">
        <Image
          src="/profile.jpg"
          width={30}
          height={30}
          alt="profile"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        {/* Top Comment Part */}
        <div className="flex flex-1">
          <div className="flex rounded-xl bg-[#F0F2F5] p-2">
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Lorem Ipsum</p>
              <p className="line-clamp-2 overflow-clip leading-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto quod consequuntur rerum saepe ipsum velit porro
                debitis reprehenderit quidem libero?
              </p>
            </div>
          </div>
          <div className="ml-1 flex w-[30px] min-w-[30px] items-center">
            <EllipsisHorizontalIcon
              className="hidden cursor-pointer rounded-full p-1 text-gray-500 hover:bg-[#F2F2F2] group-hover:block"
              width={30}
              height={30}
            />
          </div>
        </div>

        {/* Below Action Comment */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-x-4 px-2 text-xs text-gray-600">
            {["4d", "Like", "Reply", "Share"].map((text, index) => (
              <p
                key={index}
                className={`cursor-pointer ${index > 0 && "font-semibold"} hover:underline`}
              >
                {text}
              </p>
            ))}
          </div>

          <div className="flex items-center gap-x-1 text-xs">
            <p>57</p>
            {icons.map((icon, index) => (
              <Image key={index} width={20} height={20} alt="like" src={icon} />
            ))}
          </div>
        </div>

        <p className="cursor-pointer pl-2 font-semibold text-gray-500 hover:underline">
          View all 14 replies
        </p>
      </div>
    </div>
  );
}
