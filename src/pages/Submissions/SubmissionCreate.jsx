import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import SubmissionForm from '../../components/SubmissionForm';

import './submissionCreate.scss';

export default function SubmissionCreate({ season }) {
  const { pathname } = useLocation();
  const { colors, extraQueens, name, queens, queensInFinale, seasonId } =
    season;

  const getTitle = path => {
    const isEdit = path.endsWith('/edit');
    const isNew = path.endsWith('/new');

    if (isEdit) {
      return 'Edit Submission';
    }

    if (isNew) {
      return 'New Submission';
    }

    return 'Submission';
  };

  return (
    <div className="new-form">
      <h3 style={{ color: colors?.primary }}>{getTitle(pathname)}</h3>
      {console.log(season)}
    </div>
  );
}

SubmissionCreate.propTypes = {
  season: PropTypes.shape({
    colors: PropTypes.shape({
      primary: PropTypes.string,
      secondary: PropTypes.string,
    }),
    extraQueens: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.arrayOf(PropTypes.string),
    queens: PropTypes.arrayOf(PropTypes.string),
    queensInFinale: PropTypes.number,
    seasonId: PropTypes.string,
  }).isRequired,
};
