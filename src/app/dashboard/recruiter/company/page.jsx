import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/company';

const CompanyPage =async () => {
    const user =await getUserSession()
    const compnay = await getRecruiterCompany(user?.id)
    return (
        <div>
            <CompanyProfile recruiter = {user} recruiterCompany={compnay}></CompanyProfile>
        </div>
    );
};

export default CompanyPage;