"use client";

import styled from "styled-components";
import { PiTrash } from "react-icons/pi";
import Chip from "../Chip";
import ToggleSwitch from "@/components/common/ToggleSwitch";
import { useState } from "react";
import useComponentStore, {
  ComponentData,
} from "@/lib/store/useComponentStore";
import useSpaceWallStore from "@/lib/store/useSpaceWallStore";

interface BlockBottomProps {
  data: ComponentData;
}

const BlockBottom = ({ data }: BlockBottomProps) => {
  const { setComponentValue, deleteComponent } = useComponentStore();
  const { spaceWallId } = useSpaceWallStore();
  const [visible, setVisible] = useState<boolean>(data.visible);

  return (
    <Bottom>
      <Chip name={data.type} />
      <BotRight>
        <StyledTrashIcon
          onClick={() => {
            deleteComponent(spaceWallId as number, data.componentTempId);
          }}
        />
        <ToggleSwitch
          checked={!visible}
          onChange={() => {
            console.log(data.componentTempId, visible);
            setComponentValue(
              spaceWallId as number,
              data.componentTempId,
              "visible",
              !data.visible,
            );
            setVisible((prev) => !prev);
            console.log(data);
          }}
        />
      </BotRight>
    </Bottom>
  );
};

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BotRight = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
`;

const StyledTrashIcon = styled(PiTrash)`
  color: #b5b5b5;
`;

export default BlockBottom;
