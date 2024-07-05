interface ActionButtonInputCommentType {
  icon: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
}

const ActionButtonInputComment = ({ icon, tooltip, onClick }: ActionButtonInputCommentType) => {
  return (
    <div onClick={onClick} className="group/tooltip relative cursor-pointer">
      {icon}
      <p
        className={`absolute bottom-6 left-1/2 z-50 hidden -translate-x-1/2  transform
          whitespace-nowrap rounded-md bg-gray-800 p-2 text-xs text-gray-200 opacity-90 group-hover/tooltip:block`}
      >
        {tooltip}
      </p>
    </div>
  );
};

export default ActionButtonInputComment;
