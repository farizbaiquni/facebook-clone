interface ActionButtonPostProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const ActionButtonPost = ({ Icon, label }: ActionButtonPostProps) => (
  <div className="flex flex-1 cursor-pointer items-center justify-center rounded-md py-1 font-semibold text-gray-500 hover:bg-[#F2F2F2]">
    <Icon className="mr-2 text-gray-500" width={20} height={20} />
    <p>{label}</p>
  </div>
);

export default ActionButtonPost;
