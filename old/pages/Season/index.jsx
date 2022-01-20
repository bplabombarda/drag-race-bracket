import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import SubmissionList from '../../components/SubmissionList';
import { getSubmissionsBySeasonId } from '../../utils/firestore';

export default function Season({ season }) {
  const [submissions, setSubmissions] = useState({});
  const { seasonId } = useParams();

  const { primary, secondary, ...restSeason } = season;
  const seasonProp = {
    colors: {
      primary,
      secondary,
    },
    ...restSeason,
  };

  const fetchSubmissions = useCallback(async () => {
    const submissionsSnapshot = await getSubmissionsBySeasonId(seasonId);
    setSubmissions(submissionsSnapshot);
  }, [seasonId]);

  useEffect(() => {
    if (seasonId) {
      fetchSubmissions();
    }
  }, [fetchSubmissions, seasonId]);

  return (
    <>
      <div className="seasons-header">
        <h2 className="season-name" style={{ color: season?.primary }}>
          {season?.name}
        </h2>
        {season?.submissionsOpen && (
          <Link
            className="new-submission-button"
            to="submission"
            style={{ backgroundColor: season?.primary }}
          >
            New
          </Link>
        )}
      </div>

      <SubmissionList season={seasonProp} submissions={submissions} />
    </>
  );
}

Season.propTypes = PropTypes.shape({
  active: PropTypes.bool,
  extraQueens: PropTypes.arrayOf(PropTypes.string),
  finished: PropTypes.bool,
  name: PropTypes.string,
  primary: PropTypes.string,
  queens: PropTypes.arrayOf(PropTypes.string),
  queensInFinale: PropTypes.number,
  secondary: PropTypes.string,
  submissionsOpen: PropTypes.bool,
});
