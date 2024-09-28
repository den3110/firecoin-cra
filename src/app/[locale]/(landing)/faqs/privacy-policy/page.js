import { getCurrentHost } from "@/utils/clientInfo";

export default function PrivacyPolicy() {
    return (
        <div>
            <h4 className="mb-4">
                <b>Privacy Policy</b>
            </h4>
            <p>
                This Platform is exclusively used by users to trade digital assets and provides them with relevant
                Services (hereinafter referred to as "the Services"). For the convenience of wording here, The Platform
                is collectively referred to as “We” or other appropriate forms of the first-person pronouns. Any natural
                person or entity that logs into the Platform shall be a user thereof and are hereinafter referred to as
                "You" or any other applicable forms of the second-person pronouns.
            </p>
            <p>
                Our Privacy Policy (“Privacy Policy”) is designed to help you understand how we collect, use and share
                your personal information and to assist you in exercising the privacy rights available to you. This
                Privacy Policy covers the personal information We collect about You when You use our products or
                services, or otherwise interact with us, including on our public website at{" "}
                <a href={getCurrentHost()}>{getCurrentHost()}</a>. This policy also
                explains your choices surrounding how We use your personal information, which includes how You can
                object to certain uses of the information and how You can access and update certain information.
            </p>
            <h5>I. Personal Information we collect</h5>
            <p>
                We collect personal information when You provide it to us, when You use the Services, and when other
                sources provide it to us, as further described below.
            </p>
            <h6>A. Information you provide to us</h6>
            <p>
                Account Creation: When you create an account or otherwise use the Services, we collect information such
                as your name, email address, and password.
            </p>
            <p>
                Your Communications with Us: We collect personal information from you such as email address, phone
                number, or mailing address when you request information about the Services, register for our newsletter,
                request customer support, or otherwise communicate with us. We also collect the contents of messages or
                attachments that you may send to us, as well as other information you choose to provide, and that may be
                associated with your communications.
            </p>
            <h6>B. Information Collected Automatically</h6>
            <p>
                Automatic Data Collection: We want to inform You that whenever You visit the Services, we collect
                information that your browser sends to us that is called Log Data. This Log Data may include information
                such as your computer’s Internet Protocol ("IP") address, browser version, pages of the Service that you
                visit, the time and date of your visit, the time spent on those pages, and other statistics.
            </p>
            <p>
                Cookies: Cookies are files with small amount of data that are commonly used as an anonymous unique
                identifier. These are sent to your browser from the website that you visit and are stored on your
                computer’s hard drive.
            </p>
            <p>
                Our Platform uses these "cookies" to collect information and to improve the Services. You have the
                option to either accept or refuse these cookies, and know when a cookie is being sent to your computer.
                If you choose to refuse our cookies, you may not be able to use some portions of the Services.
            </p>
            <h6>C. Information from Other Sources</h6>
            <p>
                We may obtain information about you from other sources, including through third-party services and
                organizations. For example, if you access our Platform or Services through a third-party application,
                such as a social networking site or a third-party login service (Facebook or Google), the third-party
                platform will share information such as your email address, and public profile.
            </p>
            <h5>II. How we use your information</h5>
            <p>Your personal information is used for a variety of business purposes, including the following:</p>
            <h6>Provide the Services or Requested Information, such as:</h6>
            <ul>
                <li>Fulfilling our contract with you;</li>
                <li>
                    Identifying and communicating with you, including providing newsletters and marketing materials;
                </li>
                <li>Managing your information;</li>
                <li>Answering requests for customer support.</li>
            </ul>
            <h6>Serve Administrative and Communication Purposes, such as:</h6>
            <ul>
                <li>
                    Pursuing legitimate interests, such as direct marketing, research and development (including
                    marketing research), network and information security, and fraud prevention;
                </li>
                <li>
                    Sending communications about new product features, promotions, and other news about the Platform;
                </li>
                <li>Developing new products and services and improving the Services;</li>
                <li>Ensuring internal quality control and safety;</li>
                <li>Authenticating and verifying individual identities;</li>
                <li>
                    Communicating with you about your account, activities on the Services, and Privacy Policy changes;
                </li>
                <li>Preventing and prosecuting potentially prohibited or illegal activities.</li>
            </ul>
            <h5>III. How we share your information</h5>
            <p>We may share your personal information with the following categories of third parties:</p>
            <p>
                <strong>Providers</strong>: We engage service providers that help us provide, support, and develop our
                Services and understand how they are used. The categories of service providers to whom we entrust
                personal information include service providers for the provision of the Services; the provision of
                information, products, and other services you have requested; customer service activities; the provision
                of IT and related services.
            </p>
            <p>
                <strong>Partners</strong>: We may provide personal information to business partners to provide you with
                a product or service you have requested. We may also provide personal information to business partners
                with whom we jointly offer products or services. We may partner with third-party platforms (such as
                Facebook or Google) to offer you a seamless log-in experience. We share information with these
                third-party platforms when you want to use these features. For example, if you choose to sign-up or log
                in to the Platform using your account details from a third-party platform, we will share certain
                Technical Information (such as device, network connection, and IP address information) to facilitate
                this.
            </p>
            <h5>IV. Your Rights </h5>
            <p>Regarding the information you provide, you have the right to the following:</p>
            <ul>
                <li>to request a complete list of your personal data processed by the Platform;</li>
                <li>
                    to request a copy of the electronic file containing your personal data processed by the Platform;
                </li>
                <li>to demand that we suspend the processing of your personal data;</li>
                <li>to demand that we delete your personal data or stop processing it.</li>
                <li>
                    to obtain from us the rectification of inaccurate personal data, and therefore you may, at any time,
                    request to change and update your personal data by emailing us at{" "}
                    <a href={"mailto:" + process.env.NEXT_PUBLIC_SUPPORT_EMAIL}>
                        {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
                    </a>
                </li>
                <li>
                    to request that we will correct inaccuracies and errors or that we will delete your personal data
                    (except for your transaction history and other data that we are required to keep under applicable
                    laws) by emailing us at{" "}
                    <a href={"mailto:" + process.env.NEXT_PUBLIC_SUPPORT_EMAIL}>
                        {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
                    </a>
                </li>
                <li>
                    the deletion or rectification requests can be sent to us in a free form (in the body of a letter,
                    scan, etc.) to{" "}
                    <a href={"mailto:" + process.env.NEXT_PUBLIC_SUPPORT_EMAIL}>
                        {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
                    </a>{" "}
                    with your full name and contact information for a quicker processing of your request. If we are not
                    satisfied you are who you claim to be, we reserve the right to refuse to grant your requests.
                </li>
            </ul>
            <p>
                Please note that your right to demand that we suspend or terminate the processing of your personal data
                and/or delete it is not absolute and may be limited by applicable law. Unless you instruct us otherwise,
                we retain the information we collect for as long as needed to provide the Services and to comply with
                our legal obligations, resolve disputes and enforce our agreements. We may rectify, replenish or remove
                incomplete or inaccurate information, at any time and at our own discretion.
            </p>
            <h5>V. Data Retention</h5>
            <p>
                We store the personal information We receive as described in this Privacy Policy for as long as You use
                our Services or as necessary to fulfill the purpose(s) for which it was collected, provide our Services,
                resolve disputes, establish legal defenses, conduct audits, pursue legitimate business purposes, enforce
                our agreements, and comply with applicable laws.
            </p>
            <h5>VI. Security of your Information</h5>
            <p>
                We value your trust in providing us with your Personal Information, thus We are striving to use
                commercially acceptable means of protecting it. But remember that no method of transmission over the
                internet, or method of electronic storage is 100% secure and reliable, and We cannot guarantee its
                absolute security.
            </p>
            <h5>VII. Third-Party Websites/Applications</h5>
            <p>
                The Services may contain links to other websites and other websites may reference or link to our
                Services. These third-party services are not controlled by us, therefore, we strongly advise You to
                review the Privacy Policy of these websites. We do not endorse, screen, or approve, and are not
                responsible for the privacy practices or content of such other websites or applications. Visiting these
                other websites or applications is at your own risk.
            </p>
            <h5>VIII. Children's Privacy</h5>
            <p>
                The Services do not address anyone under the age of 13. We do not knowingly collect personal
                identifiable information from children under 13. In the case we discover that a child under 13 has
                provided us with personal information, we immediately delete this from our servers. If you are a parent
                or guardian and you are aware that your child has provided us with personal information, please contact
                us so that we will be able to do the necessary actions.
            </p>
            <h5>IX. Changes to This Privacy Policy</h5>
            <p>
                We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically
                for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These
                changes are effective immediately after they are posted on this page.
            </p>
            <h5>X. Contact us</h5>
            <p>
                If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us via
                email: {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
            </p>
        </div>
    );
}
