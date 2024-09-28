"use client";
import useLocale from "@/hooks/useLocales";

export default function RightsAndObligations() {
    const { locale } = useLocale();

    if (locale === "vi") {
        return (
            <div>
                <h4 className="mb-4">
                    <b>Quyền và nghĩa vụ</b>
                </h4>
                <p>1. Khách hàng có quyền:</p>
                <p>1.1. cung cấp cho Công ty lệnh tiến hành Hoạt động thông qua Trang web;</p>
                <p>
                    1.2. nếu có bất kỳ tình huống tranh chấp nào xảy ra, hãy đưa ra yêu cầu chính thức bằng thư chính
                    thức hoặc qua email tới các chi tiết được Công ty chỉ định trên Trang web.
                </p>
                <p>1.3. đơn phương chấm dứt Thỏa thuận này, trong trường hợp không có khoản nợ nào đối với Công ty.</p>
                <p>2. Khách hàng có nghĩa vụ:</p>
                <p>
                    2.1. tuân thủ các quy định của Thỏa thuận này khi nhận Dịch vụ và tiến hành các Hoạt động trên Trang
                    web;
                </p>
                <p>
                    2.2. tự chịu trách nhiệm về tất cả các hành động hoặc thiếu sót do Khách hàng hoặc các bên thứ ba
                    khác sử dụng tên người dùng và mật khẩu liên quan đến tên người dùng và mật khẩu của Khách hàng để
                    truy cập vào Trang web hoặc nền tảng trên Trang web;
                </p>
                <p>
                    2.3. chịu trách nhiệm độc quyền về tất cả các hành động và sự thiếu sót của Khách hàng, bao gồm cả
                    trách nhiệm đối với các lệnh thực hiện Hoạt động trên Trang web;
                </p>
                <p>
                    2.4. tự chịu trách nhiệm về việc lựa chọn chiến lược và xem xét các rủi ro có thể xảy ra từ Hoạt
                    động hoặc nhận Dịch vụ;
                </p>
                <p>
                    2.5. hoàn toàn chịu trách nhiệm về việc bảo mật thông tin nhận được từ Công ty và chấp nhận rủi ro
                    có thể xảy ra tổn thất tài chính của Khách hàng hoặc Công ty do các bên thứ ba truy cập trái phép
                    vào Tài khoản của Khách hàng;
                </p>
                <p>
                    2.6. thông báo cho Công ty về bất kỳ thay đổi nào về chi tiết liên hệ của Khách hàng trong vòng bảy
                    (7) ngày theo lịch kể từ thời điểm có những thay đổi đó qua thư chính thức hoặc email;
                </p>
                <p>
                    2.7. để đăng ký trên Trang web chỉ một (1) Tài khoản. Nếu có thông báo rằng Khách hàng có nhiều Tài
                    khoản, việc cung cấp Dịch vụ sẽ bị hủy bỏ và các Dịch vụ khác sẽ không được thực hiện. Công ty có
                    quyền phong tỏa tất cả các Tài khoản của Khách hàng và tiền của Khách hàng có trong đó sẽ không được
                    coi là nghĩa vụ của Công ty đối với việc rút tiền có lợi cho Khách hàng.
                </p>
                <p>
                    2.8. chỉ hoạt động với {window.location.hostname} và chỉ quảng bá các sản phẩm {window.location.hostname} sau khi trở thành đối
                    tác Liên kết của {window.location.hostname}, làm việc với các công ty cạnh tranh khác và quảng cáo các sản phẩm
                    khác có khả năng cạnh tranh với các sản phẩm của {window.location.hostname} bị nghiêm cấm. Người dùng đồng ý rằng
                    việc tham gia vào các hoạt động không tuân thủ như vậy có nghĩa là người dùng đã vi phạm thỏa thuận
                    đối tác giữa {window.location.hostname} và người dùng. Do đó, việc cung cấp Dịch vụ và các chương trình Liên kết
                    sẽ bị hủy bỏ và các dịch vụ và chương trình Liên kết khác sẽ không được thực hiện. Công ty có quyền
                    khóa tất cả các Tài khoản của Khách hàng và tiền của Khách hàng cũng như các khoản hoa hồng có trong
                    đó sẽ không được coi là nghĩa vụ của Công ty đối với việc rút tiền hoặc thanh toán có lợi cho Khách
                    hàng.
                </p>
                <p>3. Công ty có quyền:</p>
                <p>
                    3.1. nếu Khách hàng vi phạm một hoặc một số điều khoản của Thỏa thuận này để xem xét giá trị các
                    nghĩa vụ của Công ty đối với Khách hàng, với việc sửa chữa đối với mục đăng ký Hoạt động của Khách
                    hàng có liên quan;
                </p>
                <p>
                    3.2. đình chỉ việc cung cấp Dịch vụ bất kỳ lúc nào và không có bất kỳ giải thích nào cho Khách hàng;
                </p>
                <p>
                    3.3. để đơn phương chấm dứt Thỏa thuận này. Trong trường hợp đó, Công ty sẽ thông báo cho Khách hàng
                    bằng bất kỳ phương tiện nào có sẵn cho Công ty trong vòng ba (3) ngày làm việc kể từ ngày chấm dứt
                    Thỏa thuận này;
                </p>
                <p>
                    3.4. để thay đổi, thêm hoặc đặt làm mặc định tỷ lệ hoàn trả quyền chọn, tỷ suất lợi nhuận, khả năng
                    có được loại quyền chọn, số tiền quyền chọn tối thiểu và / hoặc tối đa, thời gian hết hạn có thể xảy
                    ra cho một, một số hoặc tất cả các tài sản. Công ty có quyền giới hạn số lượng quyền chọn mua tối đa
                    cho bất kỳ khung thời gian nào xuất hiện trên nền tảng giao dịch (1 phút, 1 giờ, 1 ngày theo lịch
                    hoặc bất kỳ khung thời gian nào khác). Khách hàng đồng ý rằng giá quyền chọn, lợi nhuận, báo giá, số
                    tiền tối thiểu hoặc tối đa của quyền chọn và các đặc điểm khác có thể khác nhau đối với các Khách
                    hàng khác nhau;
                </p>
                <p>
                    3.5. liên hệ với Khách hàng nếu có bất kỳ câu hỏi nào liên quan đến Thỏa thuận này, đặc biệt, để
                    chắc chắn về ý định của Khách hàng liên quan đến hành động của Khách hàng trên Tài khoản của Khách
                    hàng;
                </p>
                <p>
                    3.6. sửa đổi hoặc đổi tên bất kỳ phần, điều, khoản và từ ngữ nào của Thỏa thuận hoặc Điều khoản này
                    và Công ty không có nghĩa vụ thông báo cho Khách hàng về những thay đổi đó;
                </p>
                <p>
                    3.7. nếu có bất kỳ nguyên nhân khách quan nào, Công ty có quyền tạm ngừng cung cấp Dịch vụ cho Khách
                    hàng;
                </p>
                <p>
                    3.8. để sửa đổi quy mô giá trị các nghĩa vụ của Công ty có lợi cho Khách hàng, nếu Hoạt động được
                    thực hiện trên Trang web không được Thỏa thuận này tôn trọng;
                </p>
                <p>
                    3.9. tham gia với các bên thứ ba để cung cấp Dịch vụ theo Thỏa thuận này, với điều kiện là họ hoàn
                    toàn chịu trách nhiệm của Công ty là giữ bí mật tuyệt đối tất cả thông tin nhận được từ Khách hàng;
                </p>
                <p>
                    3.10. nếu Khách hàng không thực hiện Hoạt động trong ba (3) tháng, do đó, Khách hàng đã không thông
                    báo bằng văn bản cho Công ty về việc chấm dứt Thỏa thuận này và Tài khoản của Khách hàng, để yêu cầu
                    Khách hàng khôi phục chi phí phục vụ Tài khoản của Khách hàng với số tiền là năm mươi (50) Đô la Mỹ
                    mỗi tháng trong trường hợp có sẵn trong Tài khoản của Khách hàng với số tiền ít nhất là số tiền
                    tương ứng không thể bàn cãi và không chấp nhận xóa số tiền nói trên khỏi Tài khoản của Khách hàng mà
                    không cần thông báo trước;
                </p>
                <p>
                    3.11. chấp nhận hướng dẫn của Khách hàng để tham gia một Hoạt động. Nếu Công ty từ chối tham gia một
                    Hoạt động được đề xuất, Công ty sẽ không có nghĩa vụ phải đưa ra lý do nhưng Công ty sẽ thông báo
                    ngay cho Khách hàng theo đó;
                </p>
                <p>
                    3.12. không chấp nhận các khoản tiền do Khách hàng gửi và / hoặc hủy các khoản tiền gửi của Khách
                    hàng khi Khách hàng gửi từ 3.000 đô la trở lên hoặc nếu Khách hàng thực hiện hơn 10 khoản tiền gửi
                    riêng biệt vào Tài khoản của Khách hàng và Công ty không thể xác minh chi tiết thẻ tín dụng hoặc thẻ
                    ghi nợ của Khách hàng hoặc không thể xác minh bất kỳ điều gì khác phương thức thanh toán được sử
                    dụng. Trong trường hợp các khoản tiền gửi bị hủy và nếu cơ quan giám sát không tịch thu tiền của
                    Khách hàng vì lý do nghi ngờ rửa tiền hoặc vì bất kỳ hành vi vi phạm pháp luật nào khác, tiền của
                    Khách hàng sẽ được trả lại vào tài khoản ngân hàng đã nhận ban đầu. Nếu Khách hàng không thực hiện
                    bất kỳ Hoạt động nào sau khi gửi tiền vào Tài khoản của Khách hàng và sau đó gửi yêu cầu rút tiền,
                    Công ty có thể nhận ra hoạt động đó là một nỗ lực rửa tiền;
                </p>
                <p>
                    3.13. hủy thanh toán cho Khách hàng với việc trả lại số tiền trong Tài khoản của Khách hàng nếu
                    Khách hàng có bất kỳ sự cố kỹ thuật nào trong hệ thống thanh toán. Ngoài khoản thanh toán nói trên,
                    Công ty có thể bị hủy nếu việc thanh toán đó được tiết lộ do lỗi phần mềm. Việc Khách hàng thiếu
                    kiến thức về lỗi phần mềm không ảnh hưởng đến quyết định của Công ty. Vì mục đích xác minh kỹ thuật,
                    Tài khoản của Khách hàng có thể tạm thời bị đóng băng;
                </p>
                <p>
                    3.14. khấu trừ hoa hồng lên đến 20% từ số tiền rút nếu doanh số giao dịch trên Tài khoản của Khách
                    hàng nhỏ hơn số tiền đã gửi để loại trừ khả năng gian lận trực tuyến và trang trải chi phí giao
                    dịch;
                </p>
                <p>
                    3.15. để nhận biết Tài khoản của Khách hàng không hoạt động và xem xét các vấn đề về hoàn trả tiền
                    mặt trên cơ sở cá nhân nếu Khách hàng không đến Tài khoản quá 185 ngày theo lịch;
                </p>
                <p>
                    3.16. liên quan đến bất kỳ trường hợp và tình huống nào không được đề cập trong Thỏa thuận này, Công
                    ty có quyền hành động theo quyết định của riêng mình phù hợp với phong tục kinh doanh và thông lệ
                    hiện có.
                </p>
                <p>5. Nghĩa vụ của Công ty:</p>
                <p>
                    5.1. phù hợp với các quy định của Thỏa thuận này để cung cấp cho Khách hàng Dịch vụ trên Trang web;
                </p>
                <p>5.2. để tuân thủ các quy định của Thỏa thuận này.</p>
            </div>
        );
    }

    return (
        <div>
            <h4 className="mb-4">
                <b>Rights and Obligations</b>
            </h4>
            <p>1. Client has a right:</p>
            <p>1.1. to give Company an order to conduct Operations through the Site;</p>
            <p>
                1.2. if any disputable situation occurs, to make a claim properly in official letter or by email to the
                details specified by Company on the Site.
            </p>
            <p>1.3. to terminate this Agreement unilaterally, in case no debt to Company exists.</p>
            <p>2. Client is obliged:</p>
            <p>
                2.1. to observe the provisions of this Agreement when receiving Services and conducting of the
                Operations on the Site;
            </p>
            <p>
                2.2. to be exclusively responsible for all actions or omission resulted from usage of usernames and
                passwords by Client or other third parties in relation to Client’s usernames and passwords for an access
                to the Site or platform on the Site;
            </p>
            <p>
                2.3. to be exclusively responsible for all Client’s actions and omission, including the responsibility
                for the giving orders to conduct Operations on the Site;
            </p>
            <p>
                2.4. to be solely responsible for the choice of strategy and consideration of possible risks from
                Operations or receiving of Services;
            </p>
            <p>
                2.5. to be fully responsible for preserving confidentiality of information received from Company and to
                accept risk of possible financial loss of Client or Company resulted from unauthorized access to
                Client’s Account by the third parties;
            </p>
            <p>
                2.6. to notify Company of any changes of Client’s contact details within seven (7) calendar days from
                the moment of such changes via official letter or email;
            </p>
            <p>
                2.7. to register on the Site only one (1) Account. If it will be revealed that Client have multiple
                Accounts, the provision of Services will be canceled and further Services will not be performed. Company
                reserves the right to block all Client’s Accounts and Client’s funds contained therein will not be
                considered as Company’s obligation to withdrawal in favor of Client.
            </p>
            <p>
                2.8. to only work with {window.location.hostname} and only promote {window.location.hostname} products after becoming {window.location.hostname}'s
                Affiliate partner, working with other competitive companies and promoting other products that have the
                ability to compete with {window.location.hostname}'s products is strictly prohibited. User agree that by participating
                in such non-compliance activities means that user has breached the partnership agreement between
                {window.location.hostname} and user. As a result the provision of Services and Affiliate programs will be canceled and
                further Services and Affiliate programs will not be performed. Company reserves the right to lock all
                Client’s Accounts and Client’s funds as well as commissions contained therein will not be considered as
                Company’s obligation to withdrawal or pay for in favor of Client.{" "}
            </p>
            <p>3. Company has a right:</p>
            <p>
                3.1. if Client violates one or several provisions of this Agreement to review value of the Company’s
                obligations to Client, with corrections being made to a relevant Client’s Operation register entry;
            </p>
            <p>3.2. to suspend the provision of Services at any time and without any explanation to Client;</p>
            <p>
                3.3. to terminate this Agreement unilaterally. In such case, Company shall notify Client by any means
                available to Company within three (3) business days from the date of termination of this Agreement;
            </p>
            <p>
                3.4. to change, add or set as default the option return rate, profit rate, the possibility of acquiring
                the option type, the minimum and/or the maximum option amount, the possible expiration periods for one,
                several or all of the assets. Company has the right to limit the maximum amount of purchased options for
                any time frame that appears on the trading platform (1 minute, 1 hour, 1 calendar day or any other).
                Client agrees that option price, profitability, quotation, minimum or maximum amount of the option and
                other characteristics may be different for different Clients;
            </p>
            <p>
                3.5. to contact Client with any question concerning this Agreement, particularly, in order to make
                certain in the Client’s intentions regarding Client’s actions on Client’s Account;
            </p>
            <p>
                3.6. to amend or to rename any sections, articles, clauses and wording of this Agreement or Terms, and
                Company is not obliged to notify Client regarding such changes;
            </p>
            <p>
                3.7. if any objective causes exist, Company has a right to suspend the provision of Services to Client;
            </p>
            <p>
                3.8. to modify the size of the value of the Company’s obligations in favor of Client, if the Operations
                made on the Site is not respected by this Agreement;
            </p>
            <p>
                3.9. to engage the third parties for Service provision in accordance with this Agreement, under the
                condition that they completely assume the Company’s obligations to keep all information received from
                Client as strictly confidential;
            </p>
            <p>
                3.10. if Client doesn’t perform Operations during three (3) months, thus in writing Client didn’t notify
                Company on termination of this Agreement and Client’s Account, to require from Client of cost recovery
                on servicing of the Client’s Account in the amount of fifty (50) US dollars per month in case of
                availability on the Client’s Account of funds in the amount of at least corresponding amount
                undisputable and acceptance-free write-off the abovementioned amount from the Client’s Account without
                prior notification;
            </p>
            <p>
                3.11. to accept Client’s instructions to enter into an Operation. If Company declines to enter into a
                proposed Operation, Company shall not be obliged to give a reason but Company shall promptly notify
                Client accordingly;
            </p>
            <p>
                3.12. not to accept funds deposited by Client and/or to cancel Client’s deposits when Client deposits
                $3,000 or more or if Client makes over 10 separate deposits to Client’s Account and Company is unable to
                verify Client’s credit or debit card details or is unable to verify any other payment method used. In
                case of cancelled deposits, and if there is not a confiscation of Clients funds by a supervisory
                authority on the grounds of money laundering suspicion or for any other legal infringement, Client’s
                funds will be returned to the bank account that have been initially received. If Client does not make
                any Operations after the deposit on Client’s Account and then sends the request to withdraw, Company can
                recognize such activity as an attempt to launder money;
            </p>
            <p>
                3.13. to cancel the payment to Client with the return of the sum on Client’s Account if Client has any
                technical problems in the payment system. In addition to the abovementioned payment may be canceled by
                the Company if it will be revealed such payment received using the software errors. Lack of Client’s
                knowledge about the software error does not affect the decision of the Company. For the purposes of
                technical verification Client’s Account may be temporarily frozen;
            </p>
            <p>
                3.14. to deduct a commission of up to 20% from the withdrawal amount if the trading turnover on the
                Client's Account is less than the amount deposited in order to eliminate the possibility of online fraud
                and to cover transaction costs;
            </p>
            <p>
                3.15. to recognize the Client’s Account inactive and consider the issues about cash return on an
                individual basis if Client does not come into Account more than 185 calendar days;
            </p>
            <p>
                3.16. in regards to any circumstances and situations not covered by this Agreement Company has a right
                to act at its own discretion in accordance to business customs and existing practice.
            </p>
            <p>5. Obligations of Company:</p>
            <p>5.1. in accordance to the provisions of this Agreement to provide Client with Services on the Site;</p>
            <p>5.2. to observe the provisions of this Agreement.</p>
        </div>
    );
}
