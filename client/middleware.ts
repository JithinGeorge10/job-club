import { NextRequest, NextResponse } from 'next/server'
import { userVerifyToken } from './lib/userVerifyToken';
import { companyVerifyToken } from './lib/companyVerifyToken';
import { adminVerifyToken } from './lib/adminVerifyToken';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const isValidUser = await userVerifyToken("userAccessToken", req);
    const isValidCompany = await companyVerifyToken("companyAccessToken", req);
    const isValidadmin = await adminVerifyToken("adminAccessToken", req);

    if (url.pathname.startsWith('/login') || url.pathname.startsWith('/signup') || url.pathname.startsWith('/otpPage')
        || url.pathname.startsWith('/otpPage')) {
        if (isValidUser) {
            url.pathname = '/jobListingPage';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    if (url.pathname.startsWith('/companyLogin') || url.pathname.startsWith('/companySignUp')
        || url.pathname.startsWith('/companyOtpPage')) {
        if (isValidCompany) {
            url.pathname = '/companyDashboard';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    if (url.pathname === '/admin') {
        if (isValidadmin) {
            url.pathname = '/adminDashboard';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }



    if (url.pathname.startsWith('/userChat')
        || url.pathname.startsWith('/reviewProfile')
        || url.pathname.startsWith('/addEducation')
        || url.pathname.startsWith('/addEmployment')
        || url.pathname.startsWith('/addSkill')
        || url.pathname.startsWith('/changePassword')
        || url.pathname.startsWith('/hiredJobs')
        || url.pathname.startsWith('/inReviewJobs')
        || url.pathname.startsWith('/inerviewJobs')
        || url.pathname.startsWith('/rejectedJobs')
        || url.pathname.startsWith('/userProfile')
        || url.pathname.startsWith('/jobView')
        || url.pathname.startsWith('/jobListingPage') || url.pathname.startsWith('/userNotifiations')
        || url.pathname.startsWith('/myJobs') || url.pathname.startsWith('/appliedJobs')) {
        if (!isValidUser) {
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    if (url.pathname.startsWith('/companyDashboard') || url.pathname.startsWith('/companyChat') || url.pathname.startsWith('/applicantDetails')
        || url.pathname.startsWith('/companyApplicants') || url.pathname.startsWith('/companyJobListing') || url.pathname.startsWith('/companyManagement')
        || url.pathname.startsWith('/companyProfile') || url.pathname.startsWith('/editJob')
    ) {
        if (!isValidCompany) {
            url.pathname = '/companyLogin';
            return NextResponse.redirect(url);
        }
    }

    if (url.pathname.startsWith('/adminDashboard') || url.pathname.startsWith('/companyManagement')
        || url.pathname.startsWith('/userManagement')) {
        if (!isValidadmin) {
            url.pathname = '/admin';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}




// if (url.pathname === '/jobListingPage') {
//     const isValidUser = await userVerifyToken("userToken", req)


//     if (!isValidUser) {
//         url.pathname = '/login';
//         return NextResponse.redirect(url);
//     }
//     return NextResponse.next();
// }
// if (url.pathname === '/login') {
//     const isValidUser = await userVerifyToken("userToken", req);
//     if (isValidUser) {
//         url.pathname = '/jobListingPage';
//         return NextResponse.redirect(url);
//     }
//     return NextResponse.next();
// }

// if (url.pathname === '/signup') {
//     const isValidUser = await userVerifyToken("userToken", req);
//     if (isValidUser) {


//         url.pathname = '/jobListingPage';
//         return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
// }

// if (url.pathname === '/otpPage') {

//     const isValidUser = await userVerifyToken("userToken", req);
//     if (isValidUser) {

//         url.pathname = '/jobListingPage';
//         return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
// }

// if (url.pathname === '/companyDashboard') {
//     const isValidCompany = await companyVerifyToken("companyToken", req)


//     if (!isValidCompany) {
//         url.pathname = '/companyLogin';
//         return NextResponse.redirect(url);
//     }
//     return NextResponse.next();
// }
// if (url.pathname === '/companyLogin') {
//     const isValidCompany = await companyVerifyToken("companyToken", req);
//     if (isValidCompany) {
//         url.pathname = '/companyDashboard';
//         return NextResponse.redirect(url);
//     }
//     return NextResponse.next();
// }

// if (url.pathname === '/companySignUp') {
//     const isValidCompany = await companyVerifyToken("companyToken", req);
//     if (isValidCompany) {


//         url.pathname = '/companyDashboard';
//         return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
// }

// if (url.pathname === '/companyOtpPage') {

//     const isValidCompany = await companyVerifyToken("companyToken", req);
//     if (isValidCompany) {

//         url.pathname = '/companyDashboard';
//         return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
// }

// if (url.pathname === '/admin') {

//     const isValidadmin = await adminVerifyToken("adminToken", req);
//     if (isValidadmin) {
//         url.pathname = '/adminDashboard';
//         return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
// }

// if (url.pathname === '/adminDashboard') {

//     const isValidadmin = await adminVerifyToken("adminToken", req);
//     if (!isValidadmin) {
//         url.pathname = '/admin';
//         return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
// }
// if (url.pathname === '/companyManagement') {

//     const isValidadmin = await adminVerifyToken("adminToken", req);
//     if (!isValidadmin) {
//         url.pathname = '/admin';
//         return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
// }
// if (url.pathname === '/userManagement') {

//     const isValidadmin = await adminVerifyToken("adminToken", req);
//     if (!isValidadmin) {
//         url.pathname = '/admin';
//         return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
// }




