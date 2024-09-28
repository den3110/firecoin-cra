"use client";
import useLocale from "@/hooks/useLocales";

export default function LiabilityOfTheParties() {
    const { locale } = useLocale();

    if (locale === "vi") {
        return (
            <div>
                <h4 className="mb-4">
                    <b>Trách nhiệm của các Bên</b>
                </h4>
                <p>
                    1. Trách nhiệm của các Bên trong Hợp đồng này được xác định bởi các điều khoản của Hợp đồng và các
                    phụ lục của nó.
                </p>
                <p>
                    2. Công ty chỉ chịu trách nhiệm đối với những thiệt hại thực sự gây ra cho Khách hàng do việc Công
                    ty cố ý vi phạm các nghĩa vụ của mình dưới đây. Công ty chịu trách nhiệm về hành động của các đại
                    diện, phòng ban và Thành viên VIP thanh toán cũng như đối với các hành động của chính mình.
                </p>
                <p>
                    3. Khách hàng chịu trách nhiệm với Công ty về những tổn thất phát sinh từ Công ty mà Khách hàng chịu
                    trách nhiệm, bao gồm:
                </p>
                <p>
                    a) đối với thiệt hại gây ra do Khách hàng không cung cấp (hoặc cung cấp chậm) bất kỳ tài liệu nào
                    phải cung cấp cho Công ty theo Thỏa thuận này và các phụ lục của nó và thiệt hại gây ra cho Công ty
                    do bất kỳ thông tin sai lệch nào trong tài liệu được cung cấp bởi khách hàng;
                </p>
                <p>
                    b) đối với thiệt hại gây ra cho Công ty do lạm dụng các dịch vụ do Công ty cung cấp cho Khách hàng,
                    bao gồm cả thiệt hại (tổn thất) gây ra cho Công ty do sử dụng các thuật toán giao dịch tự động và rô
                    bốt và / hoặc các công cụ phần mềm đặc biệt và các công cụ, thiết bị, phương pháp khác và các kỹ
                    thuật tạo thuận lợi hoặc góp phần vào việc vi phạm nguyên tắc liêm chính, trung thực và công bằng
                    trong việc thực hiện các giao dịch;
                </p>
                <p>
                    c) đối với thiệt hại do Khách hàng gây ra do các hành động phối hợp với các khách hàng khác của Công
                    ty và / hoặc các chi nhánh của Khách hàng nhằm gây ra tổn thất cho Công ty và các thiệt hại khác do
                    Khách hàng gây ra cho Công ty do sử dụng các các phương pháp và kỹ thuật không trung thực để thực
                    hiện các giao dịch (giao dịch) với Công ty, bao gồm cả việc sử dụng tiền thưởng. Trong mọi tình
                    huống "Chi nhánh của khách hàng" có nghĩa là những người có quan hệ họ hàng ở bất kỳ mức độ nào; hôn
                    nhân, quan hệ đối tác, hoặc các mối quan hệ khác; cư trú cùng địa chỉ với người đó; những người sử
                    dụng cùng một thiết bị; những người được tham gia với tư cách là Khách hàng của Công ty bởi cùng một
                    đối tác hoặc Khách hàng của Công ty; và những người tham gia vào bất kỳ hoạt động chung nào có hoặc
                    không có sự hình thành của một pháp nhân. Công ty có quyền mở rộng danh sách các tình huống và thuộc
                    tính mà Khách hàng và các bên thứ ba có thể được công nhận là liên kết;
                </p>
                <p>
                    d) nếu có đủ bằng chứng cho thấy Khách hàng đã cố gắng sử dụng bất hợp pháp phần mềm do Công ty cung
                    cấp và số tiền được chuyển vào tài khoản của Công ty;
                </p>
                <p>
                    e) đối với thiệt hại gây ra cho Công ty do trích thu nhập từ việc sử dụng các tính năng kỹ thuật của
                    bản cập nhật dòng báo giá trên thiết bị đầu cuối giao dịch và trích thu nhập từ việc sử dụng các lỗi
                    và lỗ hổng phần mềm trong thiết bị đầu cuối giao dịch;
                </p>
                <p>
                    f) đối với thiệt hại gây ra cho Công ty do Khách hàng sử dụng thông tin nội bộ, thông tin bí mật
                    hoặc thông tin khác cung cấp cho Khách hàng bất kỳ lợi thế nào trong việc giao dịch với Công ty.
                    Công ty có quyền ghi nợ những tổn thất này từ tài khoản của Khách hàng và / hoặc tài khoản của những
                    người khác (nếu xác định được rằng những tài khoản này thuộc về Khách hàng (hoặc đồng phạm của Khách
                    hàng) bằng cách sử dụng các thiết bị và công cụ kỹ thuật và khác của Công ty). Công ty cũng có quyền
                    chặn các giao dịch tiếp theo trên thiết bị đầu cuối giao dịch và trang tổng quan đối với Khách hàng
                    liên quan đến việc Công ty có đủ cơ sở và nghi ngờ để phân loại hành động của họ (bao gồm cả hành
                    động chung với Khách hàng khác) là nhằm mục đích gây ra thiệt hại cho Công ty và ghi nợ số tiền từ
                    tài khoản của Khách hàng có lợi cho Công ty.
                </p>
                <p>4. Nếu Khách hàng vi phạm Thỏa thuận này, Công ty có thể, theo tùy chọn của mình:</p>
                <p>
                    4.1. Xem xét số tiền trong các nghĩa vụ tài chính của Công ty đối với Khách hàng và thực hiện các
                    thay đổi đối với dữ liệu (số dư) trong Tài khoản của Khách hàng.
                </p>
                <p>
                    4.2. Tạm dừng các dịch vụ cho Khách hàng, chặn quyền truy cập vào trạm giao dịch. Nếu Công ty chặn
                    quyền truy cập của Khách hàng vào trạm giao dịch, Khách hàng phải thực hiện tất cả các bước cần
                    thiết và hợp lý để khắc phục lý do tại sao quyền truy cập vào trạm giao dịch bị chặn. Nếu Khách hàng
                    không thực hiện bất kỳ biện pháp hoặc hành động nào để giải quyết lý do tại sao quyền truy cập bị
                    chặn trong vòng 30 (ba mươi) ngày, Công ty có thể rút tất cả tiền từ tài khoản giao dịch. Công ty có
                    quyền nhưng không có nghĩa vụ gửi lại tất cả số tiền đã được rút vào tài khoản giao dịch của Khách
                    hàng nếu Khách hàng đáp ứng tất cả các yêu cầu cần thiết để gỡ bỏ khối trên tài khoản giao dịch.
                </p>
                <p>
                    5. Nếu Khách hàng vi phạm bất kỳ điều khoản nào của Thỏa thuận và các phần không thể thiếu được liệt
                    kê trong điều khoản 1.2, bao gồm việc từ chối thực hiện các kiểm tra cần thiết và từ chối cung cấp
                    thông tin cần thiết, Công ty có quyền chấm dứt Thỏa thuận; hủy bất kỳ giao dịch nào của Khách hàng;
                    để đóng một, một số hoặc tất cả các giao dịch của Khách hàng bất kỳ lúc nào, theo quyết định riêng
                    của mình; và ngừng cung cấp dịch vụ cho Khách hàng và trả lại tiền cho Khách hàng hoặc không theo
                    quyết định của mình. Bất kỳ vi phạm nào đối với các điều khoản được liệt kê trong phần này, Khách
                    hàng sẽ tước quyền yêu cầu Công ty thanh toán hoặc hoàn lại tiền.
                </p>
                <p>
                    5.1. Nếu Công ty chấm dứt Thỏa thuận với Khách hàng do vi phạm Thỏa thuận, Khách hàng không có quyền
                    mở tài khoản mới, bao gồm cả việc nhập dữ liệu của bên thứ ba trong quá trình đăng ký. Nếu Công ty
                    phát hiện ra hành vi vi phạm của Khách hàng như được quy định trong điều khoản này, hậu quả được quy
                    định trong phần 7.5. của Thỏa thuận sẽ được áp dụng.
                </p>
                <p>
                    6. Công ty không chịu trách nhiệm với Khách hàng về bất kỳ thiệt hại, tổn thất, lợi nhuận bị mất, cơ
                    hội bị mất (không giới hạn, do biến động thị trường có thể xảy ra), chi phí hoặc thiệt hại mà Khách
                    hàng phải chịu do thực hiện các giao dịch theo các điều khoản của Hợp đồng.
                </p>
                <p>
                    7. Công ty không chịu trách nhiệm pháp lý trong trường hợp có sự khác biệt giữa thông tin được trình
                    bày trên thiết bị đầu cuối giao dịch của Khách hàng và thông tin trên Máy chủ của Công ty khi kết
                    quả tài chính của các giao dịch của Khách hàng được xác định. Để loại bỏ sự khác biệt đó, Công ty sẽ
                    điều chỉnh dữ liệu trên thiết bị đầu cuối giao dịch phù hợp với thông tin có sẵn trên Máy chủ của
                    Công ty.
                </p>
                <p>
                    8. Công ty không chịu trách nhiệm đối với những thiệt hại của Khách hàng nếu những thiệt hại đó do
                    tin tặc tấn công, tai nạn (hỏng hóc) mạng máy tính, mạng truyền thông, đường dây điện hoặc hệ thống
                    viễn thông, v.v., được sử dụng trực tiếp để xác định các điều kiện thiết yếu của giao dịch của Khách
                    hàng hoặc đảm bảo khác Quy trình hoạt động của Công ty xảy ra không do lỗi của Công ty.
                </p>
                <p>
                    9. Công ty không chịu trách nhiệm pháp lý đối với các lỗi kỹ thuật và / hoặc gián đoạn hoạt động của
                    thiết bị đầu cuối giao dịch xảy ra do các cuộc tấn công của hacker, sự cố (sự cố) của mạng máy tính,
                    mạng truyền thông, đường dây điện hoặc hệ thống viễn thông, v.v. hoặc do Khách hàng thiệt hại do lỗi
                    và / hoặc gián đoạn đó.
                </p>
                <p>
                    10. Công ty không chịu trách nhiệm về kết quả của các giao dịch mà Khách hàng đã quyết định thực
                    hiện trên cơ sở các tài liệu phân tích do Công ty và / hoặc bên thứ ba cung cấp. Khách hàng đã được
                    thông báo rằng các giao dịch được thực hiện dưới đây chịu rủi ro không nhận được thu nhập mong đợi
                    và rủi ro mất một phần hoặc toàn bộ số tiền mà họ đã gửi vào Tài khoản của Khách hàng. Khách hàng
                    thừa nhận rằng trừ khi có hành vi gian lận, cố ý vi phạm nghĩa vụ hoặc do sơ suất của phía Công ty,
                    Công ty sẽ không chịu trách nhiệm về bất kỳ tổn thất, chi phí, chi phí và thiệt hại nào của Khách
                    hàng do thông tin cung cấp cho Khách hàng không chính xác , bao gồm, nhưng không giới hạn, thông tin
                    về các giao dịch thương mại của Khách hàng. Công ty có quyền hủy bỏ hoặc đóng bất kỳ giao dịch nào
                    của Khách hàng theo các điều kiện quy định trong Thỏa thuận này; tuy nhiên, tất cả các giao dịch do
                    Khách hàng thực hiện do thông tin không chính xác này hoặc do lỗi vẫn có hiệu lực và phải được thực
                    hiện bởi cả Khách hàng và Công ty.
                </p>
                <p>
                    11. Công ty không chịu trách nhiệm về bất kỳ tổn thất nào mà Khách hàng có thể phải chịu trong
                    trường hợp bị đánh cắp, mất hoặc tiết lộ mật khẩu của mình vào trạm giao dịch cho bên thứ ba. Khách
                    hàng chịu hoàn toàn trách nhiệm về việc bảo vệ mật khẩu và bảo vệ mật khẩu trước sự truy cập trái
                    phép của bên thứ ba.
                </p>
                <p>
                    12. Công ty không chịu trách nhiệm về việc vi phạm (thực hiện không đúng) các nghĩa vụ dưới đây nếu
                    nguyên nhân là do sự kiện bất khả kháng hoặc các điều kiện ngoại lệ khác được nêu trong Thỏa thuận
                    hoặc các phụ lục của Thỏa thuận.
                </p>
                <p>
                    13. Công ty không chịu trách nhiệm đối với bất kỳ thiệt hại gián tiếp, đặc biệt, tùy tiện hoặc trừng
                    phạt nào mà Khách hàng phải chịu, bao gồm nhưng không giới hạn ở việc mất lợi nhuận, mất khoản tiết
                    kiệm dự kiến hoặc mất thu nhập, ngay cả khi Khách hàng đã được Công ty thông báo về khả năng xảy ra
                    những thiệt hại đó. Những tổn hại về tinh thần không được đền bù.
                </p>
                <p>
                    14. Công ty có quyền xem xét các vi phạm của Khách hàng bất kỳ lúc nào, bất kể thời điểm vi phạm
                    được thực hiện và, nếu vi phạm được phát hiện, sẽ thực hiện các biện pháp theo Thỏa thuận này.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h4 className="mb-4">
                <b>Liability of the Parties</b>
            </h4>
            <p>
                1. The liability of the Parties to this Agreement is determined by the terms of the Agreement and its
                annexes.
            </p>
            <p>
                2. The Company assumes liability only for real damages caused to the Client as a result of the Company's
                deliberate breach of its obligations hereunder. The Company is as responsible for the actions of its
                representatives, departments, and payment agents as it is for its own actions.
            </p>
            <p>
                3. The Client assumes liability to the Company for losses incurred by the Company for which the Client
                is responsible, including:
            </p>
            <p>
                a) for damage caused as a result of the Client's failure to provide (or late provision) of any documents
                that must be provided to the Company under this Agreement and its annexes and for damage caused to
                Company because of any misstatement of information contained in documents provided by the Client;
            </p>
            <p>
                b) for damage caused to the Company because of abuse of services provided by the Company to the Client,
                including damage (losses) caused to the Company by the use of robotic and automated transaction
                algorithms and/or special software tools and other tools, devices, methods and techniques that
                facilitate or contribute to the violation of the principle of integrity, honesty and fairness in the
                execution of transactions;
            </p>
            <p>
                c) for damage caused by the Client as a result of the actions coordinated with other clients of the
                Company and/or affiliates of the Client aimed at causing the Company losses and for other damage caused
                to the Company by the Client from the use of other unfair and dishonest methods and techniques for
                making trades (transactions) with the Company, including using bonuses. In any situation "Client
                affiliates" means persons in a kinship relationship of any degree; marital, partnership, or other
                relationships; residing at the same address as the person; persons using the same devices; persons
                engaged as a Company Client by the same partner or Client of the Company; and persons engaged in any
                joint activity with or without the formation of a legal entity. The Company reserves the right to expand
                the list of situations and attributes in which the Client and third parties may be recognized as
                affiliated;
            </p>
            <p>
                d) if there is sufficient evidence to suggest that the Client unlawfully attempted to use the software
                provided by the Company and the funds transferred to the Company's account;
            </p>
            <p>
                e) for damage caused to the Company as a result of extracting income from the use of the technical
                features of the quote stream update on the trading terminal and of extracting income from the use of
                software errors and vulnerabilities in the trading terminal;
            </p>
            <p>
                f) for damage caused to the Company by the Client's use of insider, confidential, or other information
                that provided the Client with any kind of advantages in concluding trades with the Company. The Company
                has the right to debit these losses from the Client's account and/or the accounts of other persons (if
                it is established that these accounts belong to the Client (or the Client's accomplices) using the
                Company's technical and other equipment and tools). The Company also has the right to block the further
                transactions on the trading terminal and the dashboard for Clients in respect to whom the Company has
                sufficient grounds and suspicions to classify their actions (including joint actions with other
                Client's) as aimed at causing damage to the Company and to debit the funds from the Client's account in
                favor of the Company.
            </p>
            <p>4. If the Client breaches this Agreement, the Company may, at its option:</p>
            <p>
                4.1. Review the amount of the Company’s financial obligations to the Client and make changes to the data
                (balance) of the Client’s Account.
            </p>
            <p>
                4.2. Suspend services to the Client, block access to the trading terminal. Should the Company block the
                Client’s access to the trading terminal, the Client must take all necessary and reasonable steps to
                remedy the reasons why access to the trading terminal was blocked. If the Client does not take any
                measures or actions to address the reasons why access was blocked within 30 (thirty) days, the Company
                may withdraw all funds from the trading account. The Company has a right but is not obliged to redeposit
                all funds that were withdrawn into the Client’s trading account if the Client satisfies all the
                requirements needed to lift the block on the trading account.
            </p>
            <p>
                5. If the Client breaches any terms of the Agreement and its integral parts listed in clause 1.2,
                including refusal to undergo the necessary checks and refusal to provide the necessary information, the
                Company has the right to terminate the Agreement; to void any Client transaction; to close one, several,
                or all Client trades at any time, at its own discretion; and to stop rendering services to the Client
                and return funds to the Client or not at its discretion. Any violation of the terms listed in this
                section, deprives the Customer the right to demand payment or refund from the Company.
            </p>
            <p>
                5.1. If the Company terminates the Agreement with the Client for breach of the Agreement, the Client has
                no right to open a new account, including by entering third party data during the registration. If the
                Company detects the Client's breach as set forth in this clause, the consequences stipulated in the
                section 7.5. of the Agreement will apply.
            </p>
            <p>
                6. The Company assumes no liability to the Client for any damages, losses, lost profit, lost
                opportunities (without limitations, due to possible market fluctuations), expenses or damages incurred
                by the Client as a result of the execution of trades pursuant to the terms of the Agreement.
            </p>
            <p>
                7. The Company assumes no liability in case of a discrepancy between the information represented on the
                Client’s trading terminal and the information on the Company Server when the financial result of the
                Client’s trades is determined. To eliminate such discrepancy, the Company will adjust the data on the
                trading terminal in accordance with the information available on the Company Server.
            </p>
            <p>
                8. The Company assumes no liability for the Client’s damages if those damages resulted from hacker
                attacks, accidents (failures) of computer networks, communication networks, power lines or
                telecommunication systems, etc., directly used to determine essential conditions of the Client’s
                transactions or ensure other Company operating procedures that occurred through no fault of the Company.
            </p>
            <p>
                9. The Company assumes no liability for technical failures and/or interruptions in trading terminal
                operation that occurred as a result of hacker attacks, accidents (failures) of computer networks,
                communication networks, power lines or telecommunication systems, etc., or for the Client’s losses
                resulting from such failure and/or interruption.
            </p>
            <p>
                10. The Company assumes no liability for the results of trades that the Client decided to make on the
                basis of analytical materials provided by the Company and/ or third parties. The Client has been
                informed that transactions made hereunder bear the risk of not receiving the expected income and the
                risk of loss of some or all of the money deposited by him/her in the Client’s Account. The Client
                acknowledges that unless there is fraud, deliberate breach of obligations or gross negligence on the
                part of the Company, the Company will not be liable for any losses, expenses, costs and damages of the
                Client resulting from inaccuracy of information provided to the Client, including, but not limited to,
                information about the Client’s trading transactions. The Company reserves the right to cancel or close
                any Client trade under the conditions set forth in this Agreement; nevertheless, all transactions made
                by the Client as a result of this inaccurate information or an error remains in force and must be
                fulfilled both by the Client and the Company.
            </p>
            <p>
                11. The Company assumes no liability for any losses the Client may suffer in case of theft, loss or
                disclosure of his/her password to the trading terminal to third parties. The Client assumes full
                responsibility for protecting the password and safeguarding it against unauthorized third-party access.
            </p>
            <p>
                12. The Company assumes no liability for breach (improper discharge) of the obligations hereunder if it
                was caused by force majeure events or other exceptional conditions stated in the Agreement or appendices
                to the Agreement.
            </p>
            <p>
                13. The Company assumes no liability for any indirect, special, arbitrary, or punitive damages suffered
                by the Client, including, but not limited to, lost profit, loss of expected savings or loss of income,
                even if the Client was informed by the Company about the possibility of such damages. Moral harm is not
                compensated.
            </p>
            <p>
                14. The Сompany reserves the right to consider the Clients breaches at any time, regardless of the time
                when the breach was made, and, if breaches are discovered, to take measures in accordance with this
                Agreement.
            </p>
        </div>
    );
}
