import { Row } from "@modules/core/components";
import { Study } from "@modules/studies/types";
import { DurationForm, EndDateForm, IsActiveForm, StartDateForm } from "..";

export interface StudyCardProps {
  study: Study;
}

export const StudyCard: React.FC<StudyCardProps> = ({ study }) => {
  return (
    <Row m={2} p={2} boxShadow={4}>
      <IsActiveForm study={study} />
      <StartDateForm study={study} />
      <EndDateForm study={study} />
      <DurationForm study={study} />
    </Row>
  );
};
