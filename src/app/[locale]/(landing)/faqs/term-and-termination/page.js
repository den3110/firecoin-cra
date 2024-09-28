"use client";
import useLocale from "@/hooks/useLocales";

export default function Page() {
    const { locale } = useLocale();

    if (locale === "vi") {
        return (
            <div>
                <h4 className="mb-4">
                    <b>Thời hạn và Chấm dứt</b>
                </h4>
                <p>
                    1. Thỏa thuận này có hiệu lực sau khi ký kết (đăng ký của khách hàng trên trang web hoặc trên thiết
                    bị đầu cuối giao dịch của Công ty) và có giá trị sin hợp lệ.
                </p>
                <p>2. Một trong hai Bên có thể đơn phương chấm dứt Thỏa thuận này:</p>
                <p>
                    2.1. Thỏa thuận được chấm dứt theo sáng kiến của Công ty kể từ ngày được ghi rõ trong thông báo mà
                    Công ty gửi cho Khách hàng;
                </p>
                <p>
                    2.2. Thỏa thuận được chấm dứt theo sáng kiến của Khách hàng trong năm (5) ngày làm việc sau khi Công
                    ty nhận được thông báo bằng văn bản của Khách hàng có nội dung tuyên bố chấm dứt Thỏa thuận, miễn là
                    Khách hàng không có nghĩa vụ nào chưa được thực hiện dưới đây. Khách hàng phải gửi Thông báo Chấm
                    dứt đến email liên hệ của Công ty
                </p>
                <p>
                    3. Thỏa thuận này được coi là chấm dứt đối với các Bên khi các nghĩa vụ chung của Khách hàng và của
                    Công ty đối với các giao dịch đã thực hiện trước đó được hoàn thành và tất cả các khoản nợ của mỗi
                    Bên được hoàn trả.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h4 className="mb-4">
                <b>Term and Termination</b>
            </h4>
            <p>
                1. This Agreement comes into force upon its conclusion (client registration on the website or on the
                Company’s trading terminal) and is valid sine die.
            </p>
            <p>2. Either Party may terminate this Agreement unilaterally:</p>
            <p>
                2.1. The Agreement is terminated on the initiative of the Company as of the date specified in the notice
                sent by the Company to the Client;
            </p>
            <p>
                2.2. The Agreement is terminated at the initiative of the Client in five (5) business days after the
                Company receives the Client’s written notice containing the statement of termination of the Agreement,
                provided the Client has no unfulfilled obligations hereunder. The Client must send the Termination
                Notification to the Company's contact email
            </p>
            <p>
                3. This Agreement is considered terminated with respect to the Parties when the mutual obligations of
                the Client and of the Company with respect to previously made transactions are fulfilled and all debts
                of each Party are repaid.
            </p>
        </div>
    );
}
