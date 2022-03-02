import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdLockOutline } from 'react-icons/md';
import { parsingHelper } from '../../../../helpers';
import '../../../../styles/Dashboard/Widgets.scss';
import Blocker from '../../../Blocker';

function MyProfile({ style, user, locked }) {
  const [affiliateData, setAffiliateData] = useState({});
  const name = `${user.firstName.charAt(0).toUpperCase()}. ${user.lastName}`;
  const { t } = useTranslation();

  useEffect(async () => {
    if (user.status.toUpperCase() !== 'ACTIVE') return;
    const affiliateDataFetch = await JSON.parse(localStorage.getItem('affiliateData'));
    const parsedDate = await parsingHelper.parseDate(affiliateDataFetch.regdate);

    setAffiliateData({
      id: affiliateDataFetch.refid,
      acid: affiliateDataFetch.external_id,
      registrationDate: parsedDate,
      agent: affiliateDataFetch.agent ? affiliateDataFetch.agent : 'N/A',
      master_ib: affiliateDataFetch.master_ib,
      parent_ib: affiliateDataFetch.parent,
    });
  }, []);

  return (
    <div className="my-profile widget">
      <Blocker active={locked} title="Locked" description="You need to finish verification to use this feature" icon={<MdLockOutline className="icon" />} />
      <div className={`content-wrapper my-profile-inner ${(locked) && 'blur'}`}>
        <h1 className="name disable-blur">
          {t('dashboard.main.profile.hello')}
          {' '}
          {name}
          ,
        </h1>
        {affiliateData.master_ib === '1' ? <p className="master-badge">master</p> : <div className="space-div" />}
        <div className="grid">
          <div style={style} className="grid-row">
            <div className="column-1">
              {t('dashboard.main.profile.IBID')}
              :
            </div>
            <div className="column-2">{affiliateData.id}</div>
          </div>
          {affiliateData.parent_ib === '0' ? null : (
            <div style={style} className="grid-row">
              <div className="column-1">
                Parent IB
                :
              </div>
              <div className="column-2">{affiliateData.parent_ib}</div>
            </div>
          )}
          <div style={style} className="grid-row">
            <div className="column-1">
              {t('dashboard.main.profile.registrationDate')}
              :
            </div>
            <div className="column-2">{affiliateData.registrationDate}</div>
          </div>
          <div style={style} className="grid-row">
            <div className="column-1">
              {t('dashboard.main.profile.agent')}
              :
            </div>
            <div className="column-2">{affiliateData.agent}</div>
          </div>
          <div style={style} className="grid-row">
            <div className="column-1">
              {t('dashboard.main.profile.aCID')}
              :
            </div>
            <div className="column-2">{affiliateData.acid}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
