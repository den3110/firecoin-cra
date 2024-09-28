"use client";
import useLocale from "@/hooks/useLocales";

const TermsOfUserPage = () => {
    const { locale } = useLocale();

    if (locale === "vi") {
        return (
            <div>
                <h4 className="mb-4">
                    <b>Điều khoản sử dụng</b>
                </h4>
                <p>
                    1. Trong quá trình đăng ký, Khách hàng cam kết cung cấp thông tin nhận dạng chính xác và đáng tin
                    cậy theo yêu cầu của mẫu đăng ký Khách hàng.
                </p>
                <p>
                    2. Sau khi đăng ký thành công, Khách hàng sẽ được cấp quyền truy cập vào thiết bị đầu cuối giao
                    dịch, khả năng chuyển tiền vào Tài khoản của Khách hàng (đặt một khoản tiền gửi vào Tài khoản của
                    Khách hàng để có thể thực hiện các giao dịch quyền chọn) và thực hiện các hoạt động khác.
                </p>
                <p>
                    3. Khách hàng phải nhanh chóng thông báo cho Công ty về những thay đổi trong nhận dạng và thông tin
                    liên hệ (trong vòng 7 (bảy) ngày sau khi thay đổi đó) bằng cách thực hiện các thay đổi thích hợp
                    trên Trạm giao dịch hoặc theo bất kỳ cách nào khác do Công ty cung cấp. Để xác định Khách hàng và
                    kiểm tra nguồn gốc tiền của Khách hàng bất kỳ lúc nào sau khi đăng ký, Công ty có quyền yêu cầu và
                    Khách hàng có nghĩa vụ cung cấp trong vòng 7 (bảy) ngày sau khi nhận được yêu cầu, bất kỳ giấy tờ
                    tùy thân nào (những tài liệu này bao gồm các tài liệu nhận dạng; tài liệu xác nhận địa chỉ cư trú,
                    tài liệu cho biết tình hình tài chính của Khách hàng và các tài liệu khác theo quyết định của Công
                    ty). Công ty có quyền đình chỉ các giao dịch phi giao dịch và / hoặc giao dịch trên tài khoản của
                    Khách hàng nếu phát hiện thấy thông tin nhận dạng của Khách hàng không chính xác hoặc không chính
                    xác; nếu Khách hàng chưa cung cấp các tài liệu được yêu cầu, Công ty có quyền chặn quyền truy cập
                    của Khách hàng vào thiết bị đầu cuối giao dịch cho đến khi hoàn tất thủ tục nhận dạng của khách
                    hàng. Công ty cũng có quyền yêu cầu Khách hàng thực hiện thủ tục xác định danh tính bằng cách cá
                    nhân đến thăm Thành viên VIP được Công ty ủy quyền và cung cấp các tài liệu, danh sách do Công ty
                    quyết định.
                </p>
                <p>4. Đăng nhập vào thiết bị đầu cuối giao dịch được bảo vệ bằng mật khẩu.</p>
                <p>
                    4.1. Khách hàng xác nhận và đồng ý rằng quyền truy cập vào trạm giao dịch sẽ được bảo vệ bằng mật
                    khẩu do chính Khách hàng đặt trong quá trình đăng ký. Khách hàng không được chuyển mật khẩu thiết bị
                    đầu cuối giao dịch cho bên thứ ba.
                </p>
                <p>
                    4.2. Khách hàng chịu hoàn toàn trách nhiệm về việc bảo vệ mật khẩu và ngăn chặn sự truy cập trái
                    phép của bên thứ ba vào mật khẩu đó.
                </p>
                <p>
                    4.3. Tất cả các đơn đặt hàng qua trạm giao dịch với mật khẩu của Khách hàng sẽ được coi là do Khách
                    hàng thực hiện trừ khi Công ty thiết lập khác.
                </p>
                <p>
                    4.4. Bất kỳ người nào có quyền truy cập vào thiết bị đầu cuối giao dịch bằng cách nhập mật khẩu của
                    Khách hàng sẽ được xác định là Khách hàng trừ khi Công ty quy định khác.
                </p>
                <p>
                    4.5. Công ty không chịu trách nhiệm về bất kỳ tổn thất nào mà Khách hàng có thể phải chịu trong
                    trường hợp bị đánh cắp, mất hoặc tiết lộ mật khẩu cho bên thứ ba hoặc trong trường hợp bên thứ ba sử
                    dụng trái phép dữ liệu đăng ký.
                </p>
                <p>
                    5. Khách hàng có thể tự thay đổi mật khẩu cho trạm giao dịch hoặc sử dụng quy trình khôi phục mật
                    khẩu do Công ty thiết lập.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h4 className="mb-4">
                <b>Terms of use</b>
            </h4>
            <p>
                1. During registration the Client undertakes to provide correct and reliable identification information
                in accordance with requirements of the Client registration form.
            </p>
            <p>
                2. After successful registration, the Client will be granted access to the trading terminal, the ability
                to transfer funds to the Client’s Account (placing a deposit in the Client’s Account to be able to make
                option trades) and to perform other operations.
            </p>
            <p>
                3. The Client must promptly inform the Company about changes in identification and contact information
                (within 7 (seven) days after that change) by making the appropriate changes on the Trading Terminal or
                in any other way offered by the Company. To identify the Client and to inspect the origin of the
                Client's funds at any time after registration, the Company has the right to ask and the Client obliges
                to provide within 7 (seven) days after the request is received, any identification documents (these
                documents include identity documents; documents confirming the residential address, documents indicating
                the Client's financial standing, and other documents at the Company's discretion). The Company reserves
                the right to suspend non-trading and/or trading transactions on the Client's account if it finds that
                the Client's identification information is incorrect or inaccurate; if the Client has not provided the
                requested documents, the Company has the right to block the Client's access to the trading terminal
                until the client's identification procedure is completed. The Company also has the right to demand the
                Client to undergo the identification procedure by a personal visit to a Company-authorized agent and
                provide documents, the list of which is determined by the Company at its discretion.
            </p>
            <p>4. Login to the trading terminal is password protected.</p>
            <p>
                4.1. The Client confirms and agrees that access to the trading terminal will be protected with a
                password set by the Client himself/herself during registration. The Client may not transfer the trading
                terminal password to third parties.
            </p>
            <p>
                4.2. The Client assumes full responsibility for password protection and prevention of unauthorized
                third-party access to it.
            </p>
            <p>
                4.3. All orders through the trading terminal with the Client's password will be deemed to have been made
                by the Client unless the Company establishes otherwise.
            </p>
            <p>
                4.4. Any person who obtains access to the trading terminal by entering the Client's password will be
                identified as the Client unless otherwise specified by the Company.
            </p>
            <p>
                4.5. The Company assumes no liability for any losses the Client may suffer in case of theft, loss or
                disclosure of the password to third parties or in case of unauthorized use of registration data by third
                parties.
            </p>
            <p>
                5. The Client may change the password to the trading terminal himself/herself or use the procedure for
                password recovery set by the Company.
            </p>
        </div>
    );
};

export default TermsOfUserPage;
