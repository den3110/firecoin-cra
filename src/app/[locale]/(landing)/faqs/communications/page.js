"use client";
import useLocale from "@/hooks/useLocales";

export default function CommunicationPage() {
    const locale = localStorage?.getItem("LANG") || "en";

    if (locale === "vi") {
        return (
            <div>
                <h4 className="mb-4">
                    <b>Giao tiếp</b>
                </h4>
                <p>
                    1. Để giao tiếp với Khách hàng, Công ty có thể sử dụng: - e-mail; - số fax; - Điện thoại; - TIN
                    NHẮN; - thư gửi qua đường bưu điện; - các loại tin nhắn khác nhau được gửi đến Khách hàng trên thiết
                    bị đầu cuối giao dịch, trong Bảng điều khiển, cửa sổ trình duyệt, v.v. (thông báo đẩy, lời nhắc, tin
                    nhắn dịch vụ, v.v.); - thông báo trên trang web của Công ty.
                </p>
                <p>
                    2. Để kịp thời liên lạc với Khách hàng để giải quyết các vấn đề liên quan đến giao dịch của Khách
                    hàng, Công ty sẽ sử dụng thông tin liên hệ của Khách hàng đã nhập khi Khách hàng đăng ký hoặc sửa
                    đổi tài khoản theo điều khoản 4.5 của Thỏa thuận. Khách hàng đồng ý chấp nhận tin nhắn từ Công ty
                    bất kỳ lúc nào.
                </p>
                <p>
                    3. Mọi thư từ (tài liệu, thông báo, xác nhận, thông báo, báo cáo, v.v.) đều được Khách hàng coi là
                    đã nhận được: 1) một (1) giờ sau khi chúng được gửi đến địa chỉ email (e-mail); 2) ngay sau khi
                    chúng được fax; 3) ngay sau khi cuộc điện đàm kết thúc; 4) ngay sau khi tin nhắn SMS được gửi đi; 5)
                    bảy (7) ngày theo lịch sau khi chúng được gửi qua đường bưu điện; 6) ngay sau khi thông báo được
                    đăng trên trang web của Công ty.
                </p>
                <p>
                    4. Khách hàng cũng có thể liên hệ với Công ty bằng e-mail, các địa chỉ email khác và các số điện
                    thoại được liệt kê trong Thỏa thuận này và trên trang web của Công ty.
                </p>
                <p>
                    5. Khách hàng hiểu và đồng ý rằng, nếu hành vi của Khách hàng trong các cuộc trò chuyện với đại diện
                    của Công ty là không phù hợp, Công ty có quyền đơn phương chấm dứt Thỏa thuận này.
                </p>
                <p>
                    6. Công ty có thể sử dụng thông tin liên hệ do Khách hàng cung cấp để gửi các tài liệu thông tin,
                    tiếp thị, quảng cáo và thông điệp dịch vụ cũng như để giải quyết các công việc khác. Công ty sẽ xác
                    định tần suất gửi tin nhắn cho Khách hàng theo quyết định riêng của mình. Nếu Khách hàng không muốn
                    nhận các tin nhắn thông tin (và khác) từ Công ty, họ phải hủy đăng ký bằng cách nhấp vào liên kết
                    Hủy đăng ký (nếu định dạng thông báo cung cấp khả năng này) hoặc bằng cách liên hệ với bộ phận hỗ
                    trợ khách hàng.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h4 className="mb-4">
                <b>Communications</b>
            </h4>
            <p>
                1. To communicate with the Client, the Company may use: — e-mail; — fax; — telephone; — SMS; — letters
                sent by post; — different types of messages sent to the Client on the trading terminal, in the
                Dashboard, browser window, etc. (push notifications, reminders, service messages, etc.); — announcements
                on the Company website.
            </p>
            <p>
                2. To promptly communicate with the Client to resolve problems related to Client transactions, the
                Company will use the Client's contact information entered when the Client registered or modified the
                account pursuant to clause 4.5 of the Agreement. The Client agrees to accept message from the Company at
                any time.
            </p>
            <p>
                3. Any correspondence (documents, notices, confirmations, announcements, reports etc.) are deemed
                received by the Client: 1) one (1) hour after they are sent to the email address (e-mail); 2)
                immediately after they are faxed; 3) immediately after the telephone call ends; 4) immediately after an
                SMS message is sent; 5) seven (7) calendar days after they are mailed; 6) immediately after an
                announcement is posted on the Company website.
            </p>
            <p>
                4. The Client may also contact the Company by e-mail, and other email addresses and the telephone
                numbers listed in this Agreement and on the Company website.
            </p>
            <p>
                5. The Client understands and agrees that, if the Client's behavior during conversations with a Company
                representative is inappropriate, the Company reserves the right to unilaterally terminate this
                Agreement.
            </p>
            <p>
                6. The Company may use contact information provided by the Client to send informational, marketing, and
                advertising materials, and service messages and to resolve other tasks. The Company will determine the
                frequency with which it sends messages to the Client at its sole discretion. If the Client wishes not to
                receive from informational (and other) messages from the Company, he/she must unsubscribe by clicking on
                the Unsubscribe link (if the message format provides this ability) or by contacting the client support
                department.
            </p>
        </div>
    );
}
