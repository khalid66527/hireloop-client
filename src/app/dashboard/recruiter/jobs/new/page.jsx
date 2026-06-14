import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggdInRecruiterCompany } from '@/lib/api/company';

const PostJobsPage = async() => {
    const company = await getLoggdInRecruiterCompany()
    return (
        <div>
            <PostJobForm company={company}></PostJobForm>
        </div>
    );
};

export default PostJobsPage;