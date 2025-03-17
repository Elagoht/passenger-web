import { FC } from "react";
import BottomSheet from "../../common/BottomSheet";

type TagsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TagsModal: FC<TagsModalProps> = ({ isOpen, onClose }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <h1>Tags</h1>
    </BottomSheet>
  );
};

export default TagsModal;
