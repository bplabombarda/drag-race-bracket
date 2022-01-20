import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import SubmissionList from '../Submissions/SubmissionList';
import { getSubmissionsBySeasonId } from '../../utils/firestore';
import { useSeasonsContext } from '../../context';

export default function Season() {
  const [submissions, setSubmissions] = useState({});
  const { seasonId } = useParams();
  const { seasonsList } = useSeasonsContext();

  const season = seasonsList[seasonId] || {};

  const fetchSubmissions = useCallback(async () => {
    const submissionsSnapshot = await getSubmissionsBySeasonId(seasonId);
    setSubmissions(submissionsSnapshot);
  }, [seasonId]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

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

      <SubmissionList submissions={submissions} />
    </>
  );
}
