"use client";
import useLocale from "@/hooks/useLocales";

export default function FaqsFinalProvisionsPage() {
    const locale = localStorage?.getItem("LANG") || "en";

    if (locale === "vi") {
        return (
            <div>
                <h4 className="mb-4">
                    <b>Quy định thức</b>
                </h4>
                <p>
                    1. Các sửa đổi và bổ sung đối với Thỏa thuận này và các phụ lục của Hợp đồng này do Công ty đơn
                    phương thực hiện. Tất cả các sửa đổi và bổ sung do Công ty thực hiện và không liên quan đến các
                    trường hợp quy định ở đây có hiệu lực vào ngày do Công ty quy định.
                </p>
                <p>
                    2. Các sửa đổi và bổ sung do Công ty thực hiện đối với Thỏa thuận này và các phụ lục của nó do sửa
                    đổi pháp luật và các quy định điều chỉnh đối tượng của hợp đồng này cũng như các quy tắc và hợp đồng
                    của hệ thống giao dịch được Công ty sử dụng để thực hiện các nghĩa vụ của mình dưới đây có hiệu lực
                    đồng thời với các sửa đổi trong tài liệu nói trên.
                </p>
                <p>
                    3. Khi các sửa đổi và bổ sung do Công ty thực hiện có hiệu lực, các sửa đổi và bổ sung đó sẽ được áp
                    dụng bình đẳng cho tất cả các Khách hàng, bao gồm cả những người đã ký Thỏa thuận trước ngày có hiệu
                    lực.
                </p>
                <p>
                    4. Để đảm bảo rằng Khách hàng đã tham gia Thỏa thuận biết về các sửa đổi và bổ sung, Khách hàng phải
                    truy cập Trang web của Công ty hoặc sàn giao dịch mà họ hoặc thông qua người được ủy quyền ít nhất
                    một lần một tuần để tìm thông tin về bất kỳ sửa đổi và / hoặc bổ sung nào .
                </p>
                <p>
                    .5. Khách hàng (cá nhân) cung cấp dữ liệu cá nhân của mình cho Công ty dưới bất kỳ hình thức nào và
                    theo bất kỳ cách nào (khi thực hiện bất kỳ hành động nào trên trang web của Công ty, thông qua các
                    đối tác của Công ty, v.v.) để Công ty và các đối tác đồng ý để xử lý tự động và không tự động dữ
                    liệu cá nhân của anh ấy / cô ấy nhằm mục đích thực hiện Thỏa thuận này, thực hiện các chiến dịch
                    quảng cáo, cung cấp cho anh ấy / cô ấy tài liệu quảng cáo, thông tin và tiếp thị, thông tin về các
                    chiến dịch và sự kiện do Công ty và cho các mục đích khác do Công ty xác định, cụ thể là: thu thập,
                    ghi chép, hệ thống hóa, tích lũy, lưu trữ, điều chỉnh (cập nhật, sửa đổi), trích xuất, chuyển giao
                    (phổ biến, cấp quyền truy cập), phi cá nhân hóa, chặn, xóa, hủy và chuyển dữ liệu cá nhân xuyên biên
                    giới. Được chấp thuận trong thời hạn 75 năm (hoặc cho đến khi hết thời hạn lưu giữ thông tin liên
                    quan hoặc tài liệu có chứa thông tin đó được xác định theo luật hiện hành tại địa điểm của Công ty).
                    Có thể rút lại sự đồng ý theo chính sách Bảo mật. Công ty đảm bảo tính bảo mật của dữ liệu cá nhân
                    do Khách hàng cung cấp, loại trừ các trường hợp do luật hiện hành quy định và trường hợp bất khả
                    kháng.
                </p>
                <p>
                    6. Khách hàng có thể sử dụng thông tin được cung cấp cho Khách hàng bằng lời nói hoặc văn bản được
                    đăng bởi Công ty hoặc bên thứ ba, quyền truy cập được cấp cho họ như một phần của các dịch vụ dưới
                    đây chỉ cho các giao dịch theo Thỏa thuận này. Khách hàng không được phổ biến, thay đổi hoặc bổ sung
                    thông tin nói trên, hoặc lưu trữ nó trong các kho lưu trữ riêng biệt. Trong mọi trường hợp, phạm vi
                    quyền hạn được cấp cho Khách hàng đối với thông tin do bên thứ ba đăng tải không được vượt quá phạm
                    vi quyền hạn mà Công ty có được từ bên thứ ba. Công ty không đảm bảo rằng thông tin do bên thứ ba
                    đăng tải là đáng tin cậy, chính xác hoặc có liên quan và được cung cấp liên tục mà không bị gián
                    đoạn. Công ty cũng không chịu trách nhiệm pháp lý về kết quả của các giao dịch (thua lỗ, mất lợi
                    nhuận, mất thu nhập, tổn hại đến lợi thế thương mại, v.v.) mà Khách hàng đã quyết định thực hiện
                    trên cơ sở thông tin đã được thông báo cho Khách hàng bằng miệng hoặc bằng văn bản Công ty hoặc bởi
                    các bên thứ ba.
                </p>
                <p>
                    7. Công ty có thể chuyển giao toàn bộ hoặc một phần các quyền và nghĩa vụ theo Hợp đồng này và các
                    phụ lục của Hợp đồng này cho bên thứ ba nếu người đó cam kết thực hiện các điều khoản của Hợp đồng
                    này. Việc chuyển giao quyền và nghĩa vụ này không yêu cầu Công ty thông báo trước cho Khách hàng và
                    sẽ được thực hiện vào thời điểm thông tin đầy đủ được công bố trên trang web của Công ty.
                </p>
                <p>
                    8. Khách hàng không có quyền chuyển nhượng quyền của mình, áp đặt nghĩa vụ của mình hoặc chuyển giao
                    quyền hoặc nghĩa vụ theo bất kỳ cách nào khác mà không có sự đồng ý trước bằng văn bản của Công ty.
                    Nếu điều kiện này bị vi phạm, mọi sự chuyển nhượng, áp đặt hoặc chuyển giao như vậy sẽ được coi là
                    vô hiệu.
                </p>
                <p>
                    9. Công ty, đối tác hoặc bất kỳ chi nhánh nào khác có thể có lợi ích vật chất, quan hệ pháp lý hoặc
                    thỏa thuận liên quan đến giao dịch trên nền tảng giao dịch hoặc trong Trang tổng quan hoặc lợi ích
                    vật chất, quan hệ pháp lý hoặc thỏa thuận mâu thuẫn với lợi ích của Khách hàng. Ví dụ, Công ty có
                    thể:
                </p>
                <p>a) hoạt động như một đối tác đối với bất kỳ tài sản nào;</p>
                <p>b) đề nghị một đối tác khác của Công ty làm đối tác cho hoạt động kinh doanh;</p>
                <p>
                    c) đưa ra các đề xuất và cung cấp dịch vụ cho các đối tác của mình hoặc các khách hàng khác của Công
                    ty liên quan đến tài sản mà họ quan tâm, mặc dù thực tế là điều này mâu thuẫn với lợi ích của Khách
                    hàng.
                </p>
                <p>
                    10. Khách hàng đồng ý và cho phép Công ty hành động đối với Khách hàng và đối với Khách hàng khi
                    Công ty thấy thích hợp, bất chấp xung đột lợi ích tiềm ẩn hoặc sự tồn tại của một số lợi ích quan
                    trọng đối với bất kỳ giao dịch nào trên thiết bị đầu cuối giao dịch hoặc trong Trang tổng quan mà
                    không cần thông báo trước của Khách hàng. Sự tồn tại của xung đột lợi ích hoặc lợi ích vật chất liên
                    quan đến bất kỳ giao dịch nào trên thiết bị đầu cuối giao dịch hoặc trong Bảng điều khiển không được
                    ảnh hưởng đến việc cung cấp dịch vụ cho Khách hàng của nhân viên Công ty. Đôi khi, Công ty có thể
                    thay mặt Khách hàng đại diện cho các bên mà Công ty hoặc bất kỳ bên liên quan nào của Công ty có
                    thỏa thuận nhận hàng hóa hoặc dịch vụ. Công ty đảm bảo rằng các thỏa thuận này được thực hiện càng
                    nhiều càng tốt vì lợi ích của Khách hàng, ví dụ: các thỏa thuận này giúp khách hàng có thể truy cập
                    thông tin và các dịch vụ khác mà nếu không thì không thể truy cập được.
                </p>
                <p>
                    11. Nếu một tòa án có thẩm quyền thích hợp tuyên bố bất kỳ điều khoản nào của Thỏa thuận (hoặc bất
                    kỳ phần nào của bất kỳ điều khoản nào) vô hiệu, thì điều khoản đó sẽ được coi là một phần riêng biệt
                    của Thỏa thuận và điều này sẽ không ảnh hưởng đến hiệu lực pháp lý của phần còn lại của Thỏa thuận.
                </p>
                <p>
                    12. Công ty có thể tạm dừng các dịch vụ cho Khách hàng bất kỳ lúc nào (không cần thông báo trước cho
                    Khách hàng).
                </p>
                <p>
                    13. Trong các tình huống không được mô tả trong Thỏa thuận, Công ty sẽ hành động theo các thông lệ
                    tốt nhất của thị trường dựa trên các nguyên tắc trung thực và công bằng.
                </p>
                <p>
                    14. Công ty có thể chuẩn bị và sử dụng các văn bản của Thỏa thuận và các phụ lục của Thỏa thuận bằng
                    các ngôn ngữ khác ngoài tiếng Anh. Nếu có mâu thuẫn giữa văn bản của Thỏa thuận này và các phụ lục
                    của nó bằng tiếng Anh và các văn bản tương ứng bằng các ngôn ngữ khác thì văn bản bằng tiếng Anh sẽ
                    được ưu tiên áp dụng. Văn bản của Thỏa thuận được công bố trên trang web của Công ty sẽ chiếm ưu thế
                    so với văn bản của Thỏa thuận được xuất bản ở nơi khác.
                </p>
                <p>
                    15. Khách hàng chỉ được cấp quyền hạn chế và không độc quyền để sử dụng Trạm giao dịch cho các mục
                    đích được quy định trong Thỏa thuận này. Nếu Thỏa thuận bị chấm dứt vì bất kỳ lý do gì, thì quyền
                    của Khách hàng trong việc sử dụng Trạm giao dịch được quy định trong điều khoản này sẽ bị chấm dứt
                    tại thời điểm chấm dứt Thỏa thuận.
                </p>
                <p>
                    16. Khách hàng đồng ý rằng Công ty không thể đảm bảo hoạt động liên tục không bị gián đoạn và ổn
                    định về mặt kỹ thuật của Trạm giao dịch, và do đó Khách hàng chấp nhận phần mềm này. Công ty không
                    chịu trách nhiệm với Khách hàng về các lỗi kỹ thuật trong hoạt động của Trạm giao dịch.
                </p>
                <p>
                    17. Tất cả các điều khoản được sử dụng trong Thỏa thuận này và các phần không thể tách rời của nó,
                    cho dù chúng là ký tự viết hoa hay viết thường, đều sẽ có tầm quan trọng như nhau, trừ khi thực chất
                    nghĩa vụ có những quy định khác.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h4 className="mb-4">
                <b>Final Provisions</b>
            </h4>
            <p>
                1. Amendments and additions to this Agreement and to the annexes hereto are made by the Company
                unilaterally. All amendments and additions made by the Company and not related to the circumstances
                specified herein come into force on the date specified by the Company.
            </p>
            <p>
                2. Amendments and additions made by the Company to this Agreement and to its annexes because of
                amendments to legislation and regulations governing the subject hereof and to rules and contracts of
                trading systems used by the Company to discharge its obligations hereunder come into force
                simultaneously with amendments in the aforementioned documents.
            </p>
            <p>
                3. When the amendments and supplements made by the Company come into force, they will apply equally to
                all Clients, including those who concluded the Agreement before their effective date.
            </p>
            <p>
                4. To ensure that a Client who entered into the Agreement is aware of amendments and additions, the
                Client must visit the Company's Website or the trading platform him/herself or through authorized
                persons at least once a week to find information about any amendments and/or additions.
            </p>
            <p>
                .5. The Client (individual) providing his/her personal data to the Company in any form and in any way
                (when performing any actions on the Company’s website, through the Company’s counterparties, etc.)
                thereby gives the Company and its partners his/her consent for automated and non-automated processing of
                his/her personal data for the purpose of the fulfillment of this Agreement, the implementation of
                advertising campaigns, provision to him/her of advertising, informational, and marketing materials,
                information about campaigns and events held by the Company, and for other purposes determined by the
                Company, namely: to collect, record, systematize, accumulate, store, adjust (update, amend), extract,
                transfer (disseminate, grant access), depersonalize, block, delete, destroy and transfer across borders
                personal data. Consent is given for a period of 75 years (or until expiry of the retention periods for
                the relevant information or documents containing that information determined in accordance with the
                current legislation of the Company's location). Consent may be withdrawn in accordance with Privacy
                policy. The Company guarantees the confidentiality of the personal data provided by the Client,
                excluding the circumstances set by the applicable law and force majeure.
            </p>
            <p>
                6. The Client may use information that was provided to the Client either orally or in writing that is
                posted by the Company or by third parties, access to which was granted to him/her as part of the
                services hereunder only for transactions under this Agreement. The Client may not disseminate, alter, or
                supplement the aforementioned information, or store it in separate archives. In any event, the scope of
                powers granted to the Client with respect to information posted by third parties cannot exceed the scope
                of powers obtained by the Company from the third party. The Company does not guarantee that information
                posted by third parties is reliable, accurate, or relevant and is provided on an ongoing basis without
                interruptions. Nor is the Company liable for the results of transactions (losses, lost profit, lost
                income, injury to goodwill, etc.) that the Client decided to perform on the basis of information that
                was communicated to the Client either orally or in writing by the Company or by third parties.
            </p>
            <p>
                7. The Company may fully or partially transfer the rights and obligations under this Agreement and the
                annexes hereto to a third party if such person undertakes to fulfill the terms hereof. This transfer of
                rights and obligations does not require prior notification of the Client by the Company and shall be
                made at the time the adequate information is published on the Company’s website.
            </p>
            <p>
                8. The Client is not entitled to assign his/her own rights, impose his/her own obligations or transfer
                rights or obligations hereunder in any other way without prior written consent of the Company. If this
                condition is breached, any such assignment, imposition or transfer will be deemed null and void.
            </p>
            <p>
                9. The Company, its partners or any other affiliates may have a material benefit, legal relation or
                arrangement with respect to a transaction on the trading platform or in the Dashboard or a material
                benefit, legal relation or arrangement that is in conflict with the Client’s interests. For example, the
                Company may:
            </p>
            <p>a) act as a counterparty with respect to any asset;</p>
            <p>b) suggest another partner of the Company as a counterparty for a trading operation;</p>
            <p>
                c) give recommendations and render services to its partners or other clients of the Company with respect
                to assets they are interested in, despite the fact that this is in conflict with the Client’s interests.
            </p>
            <p>
                10. The Client agrees and authorizes the Company to act with respect to the Client and for the Client as
                the Company finds appropriate, despite a potential conflict of interests or the existence of some
                material interest with respect to any transaction on the trading terminal or in the Dashboard without
                prior notification of the Client. The existence of a conflict of interest or material benefit with
                respect to any transaction on the trading terminal or in the Dashboard must not affect the provision of
                services to the Client by Company employees. From time to time the Company may act on behalf of the
                Client with parties with whom the Company or any of its related parties have an agreement to receive
                goods or services. The Company guarantees that these agreements are made as far as possible for the
                benefit of the Client, for example, these agreements make it possible to access information and other
                services that would otherwise be inaccessible.
            </p>
            <p>
                11. If a court of proper jurisdiction declares any provision of the Agreement (or any part of any
                provision) void, that provision will be treated as a separate part of the Agreement and this will not
                affect the legal force of the rest of the Agreement.
            </p>
            <p>
                12. The Company may suspend services to the Client at any time (prior notice to the Client is not
                required).
            </p>
            <p>
                13. In situations not described in the Agreement, the Company will act according to market best
                practices based on principles of honesty and fairness.
            </p>
            <p>
                14. The Company may prepare and use texts of the Agreement and its annexes in languages other than
                English. If there are contradictions between the text of this Agreement and its annexes in English and
                the corresponding texts in other languages, the text in English will prevail. The text of the Agreement
                published on the Company website prevails over the text of the Agreement published elsewhere.
            </p>
            <p>
                15. The Client is granted a limited and non-exclusive right to use the Trading Terminal only for the
                purposes stipulated in this Agreement. If the Agreement is terminated on any grounds, the Client's
                rights to use the Trading Terminal stipulated in this clause shall be terminated at the moment of the
                termination of the Agreement.
            </p>
            <p>
                16. The Client agrees that the Company cannot guarantee continuous uninterrupted and technically sound
                operation of the Trading Terminal, and therefore the Client accepts this software as is. The Company
                assumes no liability to the Client for technical failures in Trading Terminal operation.
            </p>
            <p>
                17. All terms used in this Agreement and its integral parts, whether they are in uppercase or lowercase
                characters, shall be of equal importance, unless otherwise follows from the essence of the obligation.
            </p>
        </div>
    );
}
