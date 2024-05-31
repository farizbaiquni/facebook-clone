interface ActionButtonInputCommentType {
  icon: React.ReactNode;
  tooltip: string;
}

const ActionButtonInputComment = ({
  icon,
  tooltip,
}: ActionButtonInputCommentType) => {
  return (
    <div className="group relative cursor-pointer">
      {icon}
      <p
        className={`absolute bottom-6 left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 p-2 text-xs text-gray-200 opacity-90 group-hover:block`}
      >
        {tooltip}
      </p>
    </div>
  );
};

export default ActionButtonInputComment;
