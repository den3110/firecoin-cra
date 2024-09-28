"use client";

import useLocale from "@/hooks/useLocales";

export default function ClaimResolution() {
    const { locale } = useLocale();

    if (locale === "vi") {
        return (
            <div>
                <h4 className="mb-4">
                    <b>Giải quyết khiếu nại</b>
                </h4>
                <p>
                    1. Các Bên đã đồng ý rằng họ sẽ nỗ lực hết sức để giải quyết tất cả các tranh chấp giữa Công ty và
                    Khách hàng liên quan đến các giao dịch, thanh toán và các hành động khác dưới đây bằng các biện pháp
                    thương lượng.
                </p>
                <p>
                    2. Nếu phát sinh tranh chấp, Khách hàng có thể gửi yêu cầu / khiếu nại đến Công ty và gửi tuyên bố
                    hoặc thông báo cho Công ty. Tất cả các khiếu nại / khiếu nại / tuyên bố / thông báo liên quan đến
                    các giao dịch do Khách hàng thực hiện phải được gửi theo các yêu cầu sau:
                </p>
                <p>2.1. yêu cầu / khiếu nại / tuyên bố / thông báo phải được gửi bằng văn bản;</p>
                <p>
                    2.2. khiếu nại / khiếu nại / tuyên bố / thông báo phải có các thông tin sau: Họ, tên, tên đệm (nếu
                    có), e-mail của Khách hàng, Số tài khoản của Khách hàng, ngày và giờ xảy ra tranh chấp, mô tả ngắn
                    gọn về tranh chấp, yêu cầu của Khách hàng; số tiền đã yêu cầu và tính toán hợp lý của chúng (nếu yêu
                    cầu bồi thường có thể được định giá bằng tiền); các trường hợp làm cơ sở cho yêu cầu và bằng chứng
                    hỗ trợ các trường hợp đó, bao gồm cả việc tham chiếu đến điều khoản của Thỏa thuận này (các phụ lục
                    kèm theo đây) đã bị vi phạm theo ý kiến của Khách hàng; danh sách các tài liệu và bằng chứng khác
                    kèm theo yêu cầu (khiếu nại) đã được Khách hàng xác thực; thông tin khác cần thiết để giải quyết
                    tranh chấp;
                </p>
                <p>
                    2.3. yêu cầu / khiếu nại / tuyên bố / thông báo phải được Khách hàng gửi trong vòng năm (5) ngày làm
                    việc sau sự kiện là cơ sở để gửi yêu cầu (khiếu nại) liên quan. Khách hàng đồng ý rằng sự chậm trễ
                    trong việc gửi yêu cầu (khiếu nại) là cơ sở để từ chối xem xét nó;
                </p>
                <p>
                    2.4. khiếu nại / khiếu nại / tuyên bố / thông báo có thể được gửi qua e-mail đến Công ty, bằng thư
                    bảo đảm hoặc thư bảo đảm. Các yêu cầu / khiếu nại / tuyên bố / thông báo được thực hiện và gửi bằng
                    hình thức khác sẽ không được xem xét.
                </p>
                <p>
                    3. Khiếu nại / khiếu nại / tuyên bố / thông báo không được chứa: a) đánh giá cảm tính về tranh chấp;
                    b) các tuyên bố xúc phạm đến Công ty; c) thô tục.
                </p>
                <p>
                    4. Để trả lời yêu cầu / khiếu nại / tuyên bố / thông báo, Công ty có thể yêu cầu Khách hàng bổ sung
                    tài liệu và thông tin. Yêu cầu / khiếu nại / tuyên bố / thông báo sẽ được xem xét trên cơ sở dữ liệu
                    do Khách hàng cung cấp và các mục nhật ký từ máy chủ của Công ty. Các mục nhật ký từ Máy chủ Công ty
                    luôn chiếm ưu thế hơn các bằng chứng và bằng chứng khác. Công ty không chịu trách nhiệm đối với các
                    giao dịch chưa hoàn thành và sẽ không bồi thường bất kỳ thiệt hại tài chính hoặc tổn hại tinh thần
                    nào mà Khách hàng phải chịu đối với những gì Khách hàng coi là mất lợi nhuận. Khi xem xét các tranh
                    chấp, các tham chiếu của Khách hàng đến thông tin từ các công ty và trang web khác sẽ không được xem
                    xét.
                </p>
                <p>
                    5. Công ty có thể từ chối một yêu cầu / khiếu nại / tuyên bố / thông báo nếu các điều khoản của phần
                    này bị vi phạm.
                </p>
                <p>
                    6. Công ty phải xem xét một yêu cầu / khiếu nại / đơn đăng ký / khiếu nại trong vòng không quá 10
                    ngày làm việc sau ngày nộp đơn. Điều khoản này không bao gồm thời gian để Khách hàng cung cấp các
                    tài liệu bổ sung theo yêu cầu của Công ty.
                </p>
                <p>
                    7. Nếu yêu cầu / khiếu nại / tuyên bố / thông báo của Khách hàng chưa được Công ty giải quyết bằng
                    thủ tục giải quyết tranh chấp nêu trên, Khách hàng có thể gửi khiếu nại lên Ủy ban tài chính
                    (www.financialcommission.org).
                </p>
                <p>8. Ngoài điều khoản quy định trong các khoản</p>
                <p>2.1.,</p>
                <p>2.2., và</p>
                <p>2.3; b) yêu cầu được gửi đến địa chỉ đăng ký của Công ty bằng thư bảo đảm hoặc thư bảo đảm;</p>
                <p>
                    c) Khách hàng có xác nhận của Công ty về việc nhận yêu cầu; d) thời hạn trả lời khiếu nại đã hết.
                    Thời gian phản hồi yêu cầu - sáu mươi (60) ngày theo lịch sau khi Công ty nhận được.
                </p>
                <p>
                    9. Trong trường hợp có bất kỳ tranh chấp nào, Công ty có quyền chặn toàn bộ hoặc một phần các giao
                    dịch trong Tài khoản của Khách hàng cho đến khi tranh chấp được giải quyết hoặc cho đến khi các Bên
                    đi đến một thỏa thuận tạm thời.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h4 className="mb-4">
                <b>Claims Resolution</b>
            </h4>
            <p>
                1. The Parties have agreed that they will make every effort to settle all disputes between the Company
                and the Client related to transactions, payouts and other actions hereunder by means of negotiations.
            </p>
            <p>
                2. If a dispute arises, the Client may submit a claim/complaint to the Company and send a statement or
                notice to the Company. All claims/complaints/statements/ notices related to transactions performed by
                the Client must be submitted in accordance with the following requirements:
            </p>
            <p>2.1. claims/complaints/statements/notices must be submitted in writing;</p>
            <p>
                2.2. claims/complaints/statements/notices must contain the following information: Surname, first name,
                middle name (if any), Client’s e-mail, Client’s Account Number, date and time of the dispute, brief
                description of the dispute, Client’s demands; claimed amount and justified calculation thereof (if the
                claim can be valued in money); circumstances that are the grounds for the claim and evidence supporting
                those circumstances, including reference to the clause of this Agreement (annexes hereto) that were
                breached in the Client’s opinion; a list of documents and other evidence attached to the claim
                (complaint) authenticated by the Client; other information necessary to settle the dispute;
            </p>
            <p>
                2.3. claims/complaints/statements/notices must be sent by the Client within five (5) business days after
                the event that was the basis for submission of the relevant claim (complaint). The Client agrees that a
                delay in submission of the claim (complaint) is grounds for refusal to consider it;
            </p>
            <p>
                2.4. claims/complaints/statements/notices may be sent by e-mail to the Company, by registered or
                certified mail. Claims/ complaints/statements/notices made and sent in another form will not be
                considered.
            </p>
            <p>
                3. Claims/complaints/statements/notices must not contain: a) an emotional evaluation of the dispute; b)
                offensive statements addressed to the Company; c) profanity.
            </p>
            <p>
                .4. To respond to a claim/complaint/statement/notice, the Company may request additional documents and
                information from the Client. A claim/complaint/statement/ notice will be reviewed on the basis of data
                provided by the Client and log entries from the Company server. Log entries from the Company Server
                always prevail over other evidence and proof. The Company assumes no liability for incomplete trades and
                will not compensate any financial damages or moral harm suffered by the Client with respect to what the
                Client considers to be lost profit. When considering disputes, the Client’s references to information
                from other companies and websites are not considered.
            </p>
            <p>
                5. The Company may reject a claim/complaint/statement/notice if the terms of this section are violated.
            </p>
            <p>
                6. The Company must consider a claim/complaint/application/appeal within no more than 10 working days
                after the submission date. This term does not include time for provision of additional documents by the
                Client upon the Company’s request.
            </p>
            <p>
                7. If the Client’s claim/complaint/statement/notice has not been settled by the Company by the above
                dispute settlement procedure, the Client may submit a claim to the Financial
                Commission(www.financialcommission.org).
            </p>
            <p>8. In addition to provision set forth in clauses</p>
            <p>2.1.,</p>
            <p>2.2., and</p>
            <p>2.3.; b) the claim is sent to the Company’s registration address by registered or certified mail;</p>
            <p>
                c) the Client has a confirmation of claim receipt by the Company; d) the deadline for responding to the
                claim has expired. Claim response time – sixty (60) calendar days after it is received by the Company.
            </p>
            <p>
                9. In case of any disputes, the Company reserves the right to fully or partially block transactions in
                the Client's Account until the dispute is settled or until the Parties come to an interim agreement.
            </p>
        </div>
    );
}
