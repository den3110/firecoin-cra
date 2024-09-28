"use client";

import useLocale from "@/hooks/useLocales";

const GeneralProvitionsPage = () => {
    const { locale } = useLocale();

    if (locale === "vi") {
        return (
            <div>
                <h4 className="mb-6">
                    <b>Các quy định chung</b>
                </h4>
                <p>
                    1. (Các) Thành viên VIP thanh toán được Công ty tham gia để thực hiện các giao dịch phi thương mại
                    theo Thỏa thuận này (cũng là một Bên (các Bên) của Thỏa thuận này. Chi tiết về (các) Thành viên VIP
                    thanh toán được nêu trong Thỏa thuận hiện tại. Công ty, (các) Thành viên VIP thanh toán và Khách
                    hàng được gọi chung là "Các bên".
                </p>
                <p>
                    2. Các tài liệu sau là một phần không thể tách rời của Thỏa thuận dịch vụ này (các phụ lục của Thỏa
                    thuận dịch vụ này):
                </p>
                <ul>
                    <li>
                        <p>a. Quy chế giao dịch mua bán;</p>
                    </li>
                    <li>
                        <p>b. Quy định về các giao dịch phi thương mại và chính sách KYC/AML;</p>
                    </li>
                    <li>
                        <p>c. Tuyên bố rủi ro;</p>
                    </li>
                    <li>
                        <p>
                            d. Các tài liệu khác được đặt trong phần 'Thông tin pháp lý' trên trang web của Công ty, bao
                            gồm nhưng không giới hạn ở các miền phụ của trang web của Công ty mà Khách hàng và / hoặc
                            trong thiết bị đầu cuối giao dịch có thể truy cập.
                        </p>
                        <p>
                            Công ty có thể đơn phương thay đổi danh sách, tên và nội dung của các phụ lục của Thỏa thuận
                            này. Công ty có thể thêm các phụ lục mới vào Thỏa thuận hoặc xóa các phụ lục hiện có mà
                            không cần thực hiện bất kỳ sửa đổi nào đối với điều khoản này. Văn bản của Thỏa thuận dịch
                            vụ và các phụ lục của nó được gọi là Thỏa thuận.
                        </p>
                    </li>
                </ul>
                <p>
                    3. Thỏa thuận là lời mời thực hiện các đề nghị được đăng trên trang web của Công ty. Thỏa thuận này
                    phải được coi là đề nghị ký kết Thỏa thuận này theo các điều khoản được nêu trong đó. Đề nghị đã
                    đăng không công khai. Công ty có toàn quyền quyết định từ chối tham gia Thỏa thuận với bất kỳ ai mà
                    không giải thích lý do từ chối hoặc, nếu việc đăng ký diễn ra, để chấm dứt quan hệ hợp đồng và chặn
                    quyền truy cập vào thiết bị đầu cuối giao dịch. Việc Khách hàng đăng ký trên Trang web của Công ty
                    hoặc trên thiết bị đầu cuối giao dịch được coi là sự chấp nhận đầy đủ và vô điều kiện đối với các
                    điều khoản của Thỏa thuận. Ngay sau khi Công ty nhận được khoản thanh toán để bổ sung tài khoản giao
                    dịch của Khách hàng, mỗi giao dịch của Khách hàng sử dụng thiết bị đầu cuối giao dịch hoặc Bảng điều
                    khiển sẽ trở thành đối tượng của Thỏa thuận này.
                </p>
                <p>
                    4. Khách hàng phải xem xét cẩn thận các điều khoản của Thỏa thuận. Bằng cách chấp nhận các điều
                    khoản của Thỏa thuận này, Khách hàng đồng ý với các điều khoản của tất cả các phụ lục của Thỏa thuận
                    được liệt kê ở trên, bao gồm các điều khoản về tên miền phụ của trang web của Công ty mà Khách hàng
                    có thể truy cập và xác nhận rằng anh ta / cô ấy là người lớn hợp pháp người có năng lực và không
                    phải là cư dân của một quốc gia nơi giao dịch quyền chọn có thể bị coi là bất hợp pháp. Khách hàng
                    cũng tuyên bố và đảm bảo với Công ty rằng:
                </p>
                <p>
                    4.1. Tất cả thông tin được cung cấp trong quá trình đăng ký của Khách hàng và trong quá trình thực
                    hiện Thỏa thuận, là trung thực, chính xác, đáng tin cậy và đầy đủ về mọi mặt, và Khách hàng đã tự
                    mình điền vào mẫu đăng ký;
                </p>
                <p>
                    4.2. Khách hàng có tư cách pháp nhân để tham gia Thỏa thuận này, để thực hiện các yêu cầu và đưa ra
                    đơn đặt hàng, đồng thời thực hiện các quyền và nghĩa vụ của mình theo các điều khoản của Thỏa thuận;
                </p>
                <p>
                    4.3. Khách hàng sẽ thực hiện các giao dịch thương mại và phi giao dịch với tư cách cá nhân, nhân
                    danh mình và bằng chi phí của mình và sẽ không sử dụng các khoản tiền đã vay từ các Khách hàng Công
                    ty khác hoặc từ các bên thứ ba để thực hiện các giao dịch. Khách hàng sẽ được hướng dẫn bởi các
                    nguyên tắc chính trực, trung thực và hợp lý; Khách hàng sẽ không thực hiện các hành động phối hợp
                    với các Khách hàng Công ty khác nhằm gây thiệt hại cho Công ty; Khách hàng sẽ không sử dụng các tính
                    năng kỹ thuật của bản cập nhật dòng báo giá trên thiết bị đầu cuối giao dịch và sẽ không sử dụng các
                    lỗi phần mềm, lỗi và lỗ hổng bảo mật mà họ phát hiện ra trong thiết bị đầu cuối giao dịch để trích
                    xuất thu nhập và sẽ không phân phối thông tin về lỗ hổng bảo mật cho bên thứ ba. Khách hàng sẽ không
                    sử dụng các phương pháp hoặc cách thức không công bằng và không trung thực để thực hiện các giao
                    dịch (giao dịch) với Công ty; Khách hàng sẽ không sử dụng thông tin nội bộ hoặc thông tin bí mật
                    hoặc bất kỳ thông tin nào khác, do việc sử dụng mà Khách hàng có thể có lợi khi giao dịch với Công
                    ty và / hoặc điều đó có thể gây thiệt hại cho Công ty;
                </p>
                <p>
                    4.4. Khách hàng sẽ tuân thủ các quy tắc pháp lý, đặc biệt, nhưng không giới hạn, các quy tắc quốc tế
                    nhằm kiểm soát hoạt động thương mại bất hợp pháp, gian lận tài chính và rửa tiền;
                </p>
                <p>
                    4.5. Khách hàng sẽ không sử dụng thiết bị đầu cuối giao dịch hoặc trang web để thông đồng trong các
                    hoạt động tài chính bất hợp pháp hoặc bất kỳ giao dịch bất hợp pháp nào khác;
                </p>
                <p>
                    4.6. Số tiền được Khách hàng liệt kê trên tài khoản của Công ty có nguồn gốc hợp pháp. Khách hàng sở
                    hữu hợp pháp số tiền và có quyền sử dụng và quản lý nó. Tài khoản của Khách hàng sẽ không được bổ
                    sung từ các công cụ thanh toán của bên thứ ba. Khách hàng sẽ không bổ sung tài khoản Khách hàng của
                    bên thứ ba hoặc rút tiền từ tài khoản của Khách hàng sang các phương tiện thanh toán của bên thứ ba.
                </p>
                <p>
                    4.7. Không có hành động nào của Khách hàng theo Thỏa thuận sẽ vi phạm bất kỳ luật, quy định, quyền,
                    quy định nào hoặc các quy tắc và quy định áp dụng cho Khách hàng hoặc trong khu vực pháp lý nơi
                    người đó cư trú hoặc các quy định của bất kỳ thỏa thuận nào khác ràng buộc với Khách hàng hoặc liên
                    quan bất kỳ tài sản nào của Khách hàng.
                </p>
                <p>
                    4.8. Để thực hiện các giao dịch, Khách hàng sẽ sử dụng dữ liệu tài khoản từ Trạm giao dịch của mình
                    và sẽ không chuyển dữ liệu tài khoản cho bên thứ ba và sẽ không sử dụng dữ liệu tài khoản của khách
                    hàng của Công ty cho các hoạt động giao dịch và (hoặc) phi giao dịch;
                </p>
                <p>
                    4.9. Khách hàng không phải là nhân viên liên bang hoặc thành phố, nhân viên của tổ chức liên bang
                    hoặc thành phố, nhân viên của tổ chức liên bang hoặc thành phố, một tổ chức mà thủ đô của tiểu bang
                    có lợi ích hiện hành; Khách hàng không phải là một người có ý nghĩa chính trị, một thành viên gia
                    đình hoặc họ hàng của một người có ý nghĩa chính trị; Khách hàng không phải là một người có quan hệ
                    mật thiết với một người quan trọng về mặt chính trị; Khách hàng không phải là người có liên hệ với
                    Hoa Kỳ hoặc với một quốc gia khác mà Công ty không hoạt động. Các điều khoản được sử dụng trong đoạn
                    này được Công ty giải thích và áp dụng theo quyết định riêng của mình phù hợp với các tiêu chuẩn của
                    luật pháp quốc tế và / hoặc luật pháp của một tiểu bang cụ thể, các thuật ngữ và định nghĩa được
                    chấp nhận chung, các tập quán kinh doanh.
                </p>
                <p>
                    5. Đối tượng của Thỏa thuận là định nghĩa về các điều kiện chung mà các Bên thực hiện giao dịch
                    (giao dịch), nội dung và thủ tục được quy định trong Thỏa thuận này. Công ty đơn phương thiết lập và
                    có thể thay đổi theo quyết định riêng của mình các điều kiện thiết yếu cho một giao dịch (giao
                    dịch), có thể giới hạn số lượng giao dịch được thực hiện đồng thời và giới hạn số lượng giao dịch mà
                    Khách hàng có thể thực hiện trong khoảng thời gian do Công ty quy định, có thể đặt các giới hạn khác
                    cho các giao dịch theo quyết định riêng của mình và đơn phương.
                </p>
                <p>
                    6. Công ty có thể thuê các bên thứ ba thực hiện Thỏa thuận này. Công ty không chịu trách nhiệm về
                    các dịch vụ do các bên thứ ba cung cấp.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h4 className="mb-6">
                <b>General Provisions</b>
            </h4>
            <p>
                1. The Payment Agent(s) that are engaged by the Company to carry out non-trading transactions under this
                Agreement is (are) also a Party (Parties) to this Agreement. Details of The Payment Agent(s) are stated
                in the present Agreement. The Company, Payment Agent(s) and Client are jointly referred to as "Parties".
            </p>
            <p>
                2. The following documents are an integral part of this Service Agreement (annexes to this Service
                Agreement):
            </p>
            <ul>
                <li>
                    <p>a. Regulation on trading transactions;</p>
                </li>
                <li>
                    <p>b. Regulation on non-trading transactions and the KYC/AML policy;</p>
                </li>
                <li>
                    <p>c. Risk disclosure;</p>
                </li>
                <li>
                    <p>
                        d. Other documents placed in the 'Legal Information' section on the Company's website, including
                        but not limited to the subdomains of the Company's website that are accessible by the Client and
                        / or in the trading terminal.
                    </p>
                    <p>
                        The Company may unilaterally alter the list, name, and content of annexes to this Agreement. The
                        Company may add new annexes to the Agreement or delete existing ones without making any
                        amendments to this clause. The text of the Service Agreement and of the annexes to it is
                        referred to as the Agreement.
                    </p>
                </li>
            </ul>
            <p>
                3. The Agreement is an invitation to make offers posted on the Company’s website that must be treated as
                an offer to enter into this Agreement on the terms set forth in it. The posted offer is not public. The
                Company at its sole discretion may refuse to enter into an Agreement with anyone without explaining the
                reasons for refusal or, if registration took place, to terminate contractual relations and to block
                access to the trading terminal. The Client's registration on the Company's Website or on the trading
                terminal is considered as full and unconditional acceptance of the terms of the Agreement. As soon as
                the Company receives a payment to replenish the Client's trading account, each Client transaction using
                the trading terminal or Dashboard becomes the subject of this Agreement.
            </p>
            <p>
                4. The Client must carefully review the terms of the Agreement. By accepting the terms of this
                Agreement, the Client agrees to the terms of all annexes to it listed above, including the terms on
                subdomains of the Company's website that are accessible by the Client and confirms that he/she is an
                adult who is a legally capable person and is not a resident of a country where trading in options may be
                deemed illegal. The Client also represents and warrants to the Company that:
            </p>
            <p>
                4.1. All information provided during Client registration and during the performance of Agreement, is
                true, accurate, reliable and complete in all respects, and the Client completed the registration form
                him/herself;
            </p>
            <p>
                4.2. The Client possesses legal personality to enter into this Agreement, to make inquiries and give
                orders, and to exercise his rights and to fulfill obligations in accordance with the terms of the
                Agreement;
            </p>
            <p>
                4.3. The Client will carry out trading and non-trading transactions personally, on his own behalf and at
                his own expense and will not use funds borrowed from other Company Clients or from third parties to
                carry out transactions. The Client will be guided by the principles of integrity, honesty, and
                rationality; the Client will not take actions coordinated with other Company Clients aimed at damaging
                the Company; the Client will not use technical features of the quote stream update on the trading
                terminal and will not use software errors, defects, and vulnerabilities he discovers in the trading
                terminal to extract income and will not distribute the information about vulnerabilities to the third
                parties. The Client will not use unfair and dishonest methods or ways of making trades (transactions)
                with the Company; the Client will not use insider or confidential information or any other information,
                as a result of the use of which the Client might benefit when trading with the Company and/or that might
                damage the Company;
            </p>
            <p>
                4.4. The Client will adhere to legal norms, in particular, but not limited to, international norms aimed
                at controlling illegal trade, financial fraud, and money laundering;
            </p>
            <p>
                4.5. The Client will not use the trading terminal or website to collude in illegal financial activities
                or any other illegal transaction;
            </p>
            <p>
                4.6. The money listed by the Client on the Company's account has legal origin. The Client legally owns
                the money and has the right to use and manage it. The Client's account will not be replenished from
                third party payment instruments. The Client will not replenish third party Client accounts or withdraw
                money from the Client's account to third party payment instruments.
            </p>
            <p>
                4.7. No actions of the Client pursuant to the Agreement will violate any law, regulation, right, bylaws,
                or rules and regulations applicable to the Client or in the jurisdiction where he/she resides or the
                provisions of any other agreement binding on the Client or involving any assets of the Client.
            </p>
            <p>
                4.8. To carry out transactions, the Client will use account data from Trading Terminal belonging to him
                and will not transfer account data to third parties and will not use account data of the Company's
                clients for trading and (or) non-trading operations;
            </p>
            <p>
                4.9. The Client is not a federal or municipal employee, an employee of a federal or municipal
                institution, an employee of a federal or municipal organization, an organization in whose capital the
                state has a prevailing interest; the Client is not a politically significant person, a family member or
                a relative of a politically significant person; the Client is not a person closely connected with a
                politically significant person; the Client is not a person connected with the United States or with
                another country in which the Company does not operate. The terms used in this paragraph are interpreted
                and applied by the Company at its own discretion in accordance with the norms of international
                legislation and/or legislation of a particular state, generally accepted terms and definitions,
                customary business practices.
            </p>
            <p>
                5. The subject of the Agreement is the definition of the general conditions under which the Parties
                carry out transactions (trades), the content and procedure for which are set forth in this Agreement.
                The Company unilaterally sets and may alter at its sole discretion essential conditions for a
                transaction (trade), may limit the number of trades executed simultaneously, and limit the number of
                trades that a Client may make within the time period set by the Company, may set other limits for trades
                at its sole discretion and unilaterally.
            </p>
            <p>
                6. The Company may engage third parties to perform this Agreement. The company is not responsible for
                services provided by such third parties.
            </p>
        </div>
    );
};

export default GeneralProvitionsPage;
