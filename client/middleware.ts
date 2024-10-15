import { NextRequest, NextResponse } from 'next/server'
import { userVerifyToken } from './lib/userVerifyToken';
import { companyVerifyToken } from './lib/companyVerifyToken';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    if (url.pathname === '/jobListingPage') {
        const isValidUser = await userVerifyToken("userToken", req)

        console.log(isValidUser);

        if (!isValidUser) {
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }
    if (url.pathname === '/login') {
        const isValidUser = await userVerifyToken("userToken", req);
        if (isValidUser) {
            console.log(isValidUser);
            url.pathname = '/jobListingPage';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    if (url.pathname === '/signup') {
        const isValidUser = await userVerifyToken("userToken", req);
        if (isValidUser) {
            console.log('======');

            console.log(isValidUser);

            url.pathname = '/jobListingPage';
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }

    if (url.pathname === '/otpPage') {

        const isValidUser = await userVerifyToken("userToken", req);
        if (isValidUser) {

            url.pathname = '/jobListingPage';
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }

    if (url.pathname === '/companyDashboard') {
        const isValidCompany = await companyVerifyToken("companyToken", req)

        console.log(isValidCompany)

        if (!isValidCompany) {
            url.pathname = '/companyLogin';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }
    if (url.pathname === '/companyLogin') {
        const isValidCompany = await companyVerifyToken("companyToken", req);
        if (isValidCompany) {
            console.log(isValidCompany);
            url.pathname = '/companyDashboard';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    if (url.pathname === '/companySignUp') {
        const isValidCompany = await companyVerifyToken("companyToken", req);
        if (isValidCompany) {
            console.log('======');

            console.log(isValidCompany);

            url.pathname = '/companyDashboard';
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }

    if (url.pathname === '/companyOtpPage') {

        const isValidCompany = await companyVerifyToken("companyToken", req);
        if (isValidCompany) {

            url.pathname = '/companyDashboard';
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }
}
