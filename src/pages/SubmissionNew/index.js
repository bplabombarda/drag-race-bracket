import React from "react";

import SubmissionForm from "Components/SubmissionForm";
import { object, string, func } from "prop-types";

import "./submissionNew";

export default function SubmissionNew({
  addSubmission,
  path,
  seasonId,
  seasonObject,
  name,
  colors,
}) {
  const { extraQueens, queens, queensInFinale } = seasonObject;

  const getTitle = (path) => {
    const isEdit = path.endsWith("/edit");
    const isNew = path.endsWith("/new");

    if (isEdit) {
      return "Edit Submission";
    }

    if (isNew) {
      return "New Submission";
    }

    return "Submission";
  };

  return (
    <div className="new-form">
      <h3 style={{ color: colors.primary }}>{getTitle(path)}</h3>
      <SubmissionForm
        addSubmission={addSubmission}
        numberInFinal={queensInFinale}
        extraOptions={extraQueens}
        options={queens || []}
        seasonId={seasonId}
        name={name}
        colors={colors}
      />
    </div>
  );
}

SubmissionNew.propTypes = {
  addSubmission: func,
  path: string,
  seasonId: string,
  seasonObject: object,
  name: string,
};
