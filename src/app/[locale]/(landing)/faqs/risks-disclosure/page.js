"use client";
import useLocale from "@/hooks/useLocales";

export default function RiskDisclosure() {
    const { locale } = useLocale();

    if (locale === "vi") {
        return (
            <div>
                <h4 className="mb-4">
                    <b>Tiết lộ rủi ro</b>
                </h4>
                <p>
                    All Khách hàng và Khách hàng tiềm năng phải nghiên cứu kỹ việc tiết lộ rủi ro này trước khi hoàn tất
                    đăng ký trên Trang web hoặc trên thiết bị đầu cuối giao dịch và trước khi họ bắt đầu thực hiện giao
                    dịch. Mục đích của Tiết lộ rủi ro này (sau đây gọi là Tiết lộ) là tiết lộ cho Khách hàng thông tin
                    về rủi ro liên quan đến các giao dịch trên thị trường tài chính nói chung và với các quyền chọn nói
                    riêng và để cảnh báo Khách hàng về những tổn thất tài chính có thể xảy ra và rủi ro liên quan. Danh
                    sách các rủi ro được đưa ra trong Tiết lộ này không đầy đủ vì có nhiều tình huống có thể xảy ra
                    trong quá trình giao dịch. Sự tiết lộ này dành cho mục đích thông tin. Nó có nghĩa là cung cấp một
                    lời giải thích chung về các rủi ro liên quan đến các quyền chọn.
                </p>
                <p>
                    1. Khách hàng thừa nhận rằng các giao dịch quyền chọn là các khoản đầu tư mang tính đầu cơ và cực kỳ
                    rủi ro và chỉ phù hợp với những nhà đầu tư:
                </p>
                <ul>
                    <li>
                        <p>- Hiểu và sẵn sàng đối mặt với các rủi ro kinh tế, pháp lý và các rủi ro khác,</p>
                    </li>
                    <li>
                        <p>
                            - Có tính đến tình hình tài chính, nguồn lực tài chính và nghĩa vụ của họ, có thể chịu được
                            rủi ro mất những gì họ đầu tư,
                        </p>
                    </li>
                    <li>
                        <p>- Có đủ kiến thức để hiểu giao dịch quyền chọn là gì.</p>
                    </li>
                </ul>
                <p>
                    Công ty không cung cấp cho Khách hàng bất kỳ khuyến nghị hoặc lời khuyên nào về các lựa chọn và
                    không đưa ra các khuyến nghị đầu tư dưới bất kỳ hình thức nào. Khách hàng tự mình đưa ra quyết định
                    về chiến lược giao dịch và các hành động cụ thể dựa trên sự hiểu biết của mình về thị trường hoặc
                    tham vấn với các cố vấn tài chính độc lập không liên kết với Công ty. Quyền chọn là các công cụ tài
                    chính phái sinh, giá của chúng được tính từ giá của các tài sản / thị trường cơ bản mà chúng được
                    liên kết với nhau (ví dụ: tiền tệ, chỉ số chứng khoán, cổ phiếu, kim loại, hợp đồng tương lai,
                    v.v.). Vì lý do này, điều cực kỳ quan trọng là khách hàng phải hiểu những rủi ro liên quan đến việc
                    giao dịch trên thị trường / tài sản cơ sở thích hợp. Một số rủi ro này là:
                </p>
                <ul>
                    <li>
                        <p>
                            - Sự biến động - chuyển động của tài sản cơ bản / giá thị trường có thể không ổn định và
                            không thể đoán trước. Thực tế này có ảnh hưởng trực tiếp đến kết quả tài chính của Khách
                            hàng. Hiểu được sự biến động của thị trường cho phép Khách hàng phân tích lợi nhuận tiềm
                            năng và vạch ra chiến lược giao dịch.
                        </p>
                    </li>
                    <li>
                        <p>
                            - Biến động thị trường - sự thay đổi đột ngột về giá của tài sản cơ bản từ mức này sang mức
                            khác. Các yếu tố khác nhau có thể gây ra những thay đổi đột ngột (ví dụ, các sự kiện kinh tế
                            hoặc thông báo thị trường). Những yếu tố này có thể xảy ra cả khi thị trường mở cửa hoặc khi
                            thị trường đóng cửa. Khi các yếu tố này tồn tại vào thời điểm thị trường đóng cửa, giá của
                            tài sản cơ bản bị ảnh hưởng bởi yếu tố đó tại thời điểm thị trường mở cửa có thể khác đáng
                            kể so với giá của tài sản cơ sở lúc thị trường đóng cửa. Có thể không thể đóng một vị thế mở
                            ở một mức giá có lợi.
                        </p>
                    </li>
                    <li>
                        <p>Điều này có thể dẫn đến thua lỗ đáng kể và lợi nhuận đáng kể.</p>
                    </li>
                    <li>
                        <p>
                            - Tính thanh khoản: giá trị của quyền chọn có thể phụ thuộc vào một số yếu tố, bao gồm nhưng
                            không giới hạn ở sự thay đổi tỷ lệ cung-cầu; các chương trình và chiến lược của chính phủ,
                            nông nghiệp, thương mại và thương mại; các sự kiện kinh tế chính trị trong nước và quốc tế;
                            và tâm lý phổ biến trên thị trường liên quan. Các điều kiện thị trường có thể thay đổi đáng
                            kể trong một khoảng thời gian rất ngắn và do đó, ở một số thị trường, Khách hàng có thể
                            không thể tạo ra lợi nhuận dự kiến.
                        </p>
                    </li>
                </ul>
                <p>
                    2. Khách hàng chịu rủi ro về tổn thất tài chính liên quan đến sự cố, gián đoạn, mất kết nối hoặc các
                    cuộc tấn công ác ý của người thứ ba liên quan đến thông tin, liên lạc, điện, điện tử và các hệ thống
                    khác được sử dụng để thực hiện giao dịch.
                </p>
                <p>
                    Trong số các rủi ro khác, Khách hàng chịu các rủi ro sau đây về tổn thất do: - lỗi nguồn và / hoặc
                    thiết bị từ phía Khách hàng hoặc nhà cung cấp dịch vụ liên lạc của Khách hàng (cụ thể là giao tiếp
                    bằng giọng nói);
                </p>
                <ul>
                    <li>
                        <p>
                            - Thiệt hại vật chất (hoặc phá hủy) các kênh liên lạc được sử dụng để liên lạc giữa nhà cung
                            cấp và nhà cung cấp của Khách hàng (nhà cung cấp dịch vụ truyền thông) và máy chủ của Khách
                            hàng;
                        </p>
                    </li>
                    <li>
                        <p>
                            - Không thực hiện được (chất lượng cực kỳ thấp) khi truyền qua các kênh do Khách hàng sử
                            dụng hoặc các kênh được sử dụng bởi nhà cung cấp hoặc nhà cung cấp dịch vụ liên lạc (cụ thể
                            là giao tiếp bằng giọng nói) mà Khách hàng sử dụng;
                        </p>
                    </li>
                    <li>
                        <p>
                            - Sử dụng các kênh liên lạc, thiết bị và phần mềm không đảm bảo việc Khách hàng nhận được
                            hoặc nhận kịp thời các tin nhắn (đặc biệt là tin nhắn văn bản) từ Công ty;
                        </p>
                    </li>
                    <li>
                        <p>
                            - Không đạt (chất lượng cực kỳ thấp) thông tin liên lạc qua các kênh do Công ty sử dụng, cụ
                            thể là thiệt hại vật chất (phá hủy) kênh liên lạc bởi người thứ ba.
                        </p>
                    </li>
                </ul>
                <p>
                    3. Khách hàng nhận ra rằng các hoạt động giao dịch của mình có thể gặp rủi ro liên quan đến mạng,
                    bao gồm cả lỗi phần cứng, phần mềm, máy chủ, đường truyền thông tin và internet. Bất kỳ lỗi nào như
                    vậy đều có thể dẫn đến việc không thực hiện đơn đặt hàng của Khách hàng theo đơn đặt hàng của họ.
                    Công ty sẽ không chịu trách nhiệm trong trường hợp hỏng hóc đó.
                </p>
                <p>
                    4. Khách hàng hiểu rằng Internet có thể xảy ra các sự kiện ảnh hưởng đến quyền truy cập của họ vào
                    trang web của Công ty và thiết bị đầu cuối giao dịch, bao gồm nhưng không giới hạn ở việc gián đoạn
                    hoặc hỏng hóc phần mềm và phần cứng, ngắt kết nối internet, mất điện hoặc bị hacker tấn công. Công
                    ty không chịu trách nhiệm đối với bất kỳ thiệt hại hoặc mất mát nào do các sự kiện nằm ngoài tầm
                    kiểm soát của mình hoặc bất kỳ thiệt hại, chi phí, trách nhiệm pháp lý nào khác (bao gồm, nhưng
                    không giới hạn, lợi nhuận bị mất) có thể do Khách hàng không thể truy cập vào trang web của Công ty
                    hoặc sự chậm trễ trong hoặc không gửi đơn đặt hàng.
                </p>
                <p>
                    5. Khi giao dịch qua thiết bị đầu cuối giao dịch, Khách hàng chịu rủi ro về tổn thất tài chính có
                    thể phát sinh do: - lỗi phần cứng và phần mềm, lỗi thiết bị và chất lượng kém của dịch vụ viễn thông
                    từ phía Khách hàng; - thiết bị của Khách hàng bị trục trặc.
                </p>
                <p>
                    6. Khách hàng thừa nhận rằng trong điều kiện thị trường bất thường, thời gian xử lý đơn đặt hàng của
                    khách hàng có thể tăng lên.
                </p>
                <p>
                    7. Khách hàng thừa nhận rằng chỉ có một yêu cầu hoặc đơn đặt hàng có thể nằm trong hàng đợi yêu cầu
                    / đơn đặt hàng trên máy chủ. Mọi nỗ lực gửi yêu cầu hoặc đơn đặt hàng mới sẽ bị từ chối.
                </p>
                <p>
                    8. Khách hàng thừa nhận rằng nguồn thông tin đáng tin cậy duy nhất về giá tài sản là Máy chủ của
                    Công ty. Giá tài sản trên thiết bị đầu cuối giao dịch của Khách hàng không thể được sử dụng làm
                    nguồn thông tin giá đáng tin cậy vì nếu kết nối giữa thiết bị đầu cuối giao dịch của Khách hàng và
                    Máy chủ của Công ty trở nên không ổn định, một số báo giá tài sản có thể không đến được thiết bị đầu
                    cuối giao dịch của Khách hàng.
                </p>
                <p>
                    9. Khách hàng thừa nhận rằng việc đóng cửa sổ trình duyệt web sẽ không hủy đơn đặt hàng hoặc yêu cầu
                    đã được Công ty nhận để xử lý.
                </p>
                <p>
                    10. Khách hàng chịu rủi ro thực hiện các giao dịch ngoài kế hoạch nếu họ gửi lại đơn đặt hàng trước
                    khi nhận được thông tin về kết quả xử lý đơn đặt hàng trước đó.
                </p>
                <p>
                    11. Khách hàng chịu rủi ro về bất kỳ tổn thất tài chính nào do không nhận được hoặc chậm nhận được
                    bất kỳ tin nhắn nào từ Công ty.
                </p>
                <p>
                    12. Khách hàng thừa nhận rằng thông tin được gửi qua e-mail không được mã hóa không được bảo vệ
                    trước sự truy cập trái phép.
                </p>
                <p>
                    13. Khách hàng hoàn toàn chịu trách nhiệm duy trì tính bảo mật của thông tin mà họ nhận được từ Công
                    ty và chịu rủi ro về bất kỳ tổn thất tài chính nào do bên thứ ba truy cập trái phép vào tài khoản
                    giao dịch của mình. Công ty không chịu trách nhiệm đối với việc bên thứ ba truy cập trái phép vào
                    thông tin, bao gồm e-mail, thông tin liên lạc điện tử, dữ liệu cá nhân và dữ liệu truy cập xảy ra
                    tại thời điểm truyền giữa Công ty hoặc bất kỳ bên nào khác qua Internet hoặc các mạng liên lạc khác,
                    điện thoại hoặc bất kỳ phương tiện điện tử nào khác.
                </p>
                <p>
                    14. Khách hàng chịu rủi ro về tổn thất tài chính (thiệt hại) do các sự kiện bất khả kháng gây ra,
                    được định nghĩa là bất kỳ hành động, sự kiện hoặc hiện tượng nào, bao gồm, nhưng không giới hạn ở:
                </p>
                <ul>
                    <li>
                        <p>
                            - Đình công, bạo loạn hàng loạt hoặc bất ổn dân sự, tấn công khủng bố, chiến tranh, thiên
                            tai, tai nạn, hỏa hoạn, lũ lụt, bão, cuồng phong, mất điện, lỗi liên lạc, phần mềm hoặc
                            thiết bị điện tử mà theo ý kiến hợp lý của Công ty, dẫn đến sự mất ổn định của thị trường
                            hoặc thị trường của một hoặc một số công cụ;
                        </p>
                    </li>
                    <li>
                        <p>
                            - Đình chỉ, thanh lý hoặc đóng cửa bất kỳ thị trường nào hoặc không có bất kỳ sự kiện nào mà
                            Công ty đưa ra báo giá hoặc áp đặt các hạn chế hoặc các điều kiện thương mại đặc biệt hoặc
                            không tiêu chuẩn, cũng như thực hiện các giao dịch trên bất kỳ thị trường nào hoặc đối với
                            bất kỳ điều kiện nào như vậy biến cố.
                        </p>
                    </li>
                </ul>
                <p>
                    15. Khách hàng chịu rủi ro tài chính và các rủi ro khác trong trường hợp các giao dịch (và các hành
                    động liên quan) trên thị trường tài chính bị cấm hoặc hạn chế bởi luật pháp của quốc gia nơi Khách
                    hàng thường trú.
                </p>
                <p>
                    16. Công ty không đảm bảo rằng các hoạt động của Khách hàng liên quan đến giao dịch quyền chọn không
                    hoặc sẽ không bị đánh thuế trong tương lai. Khách hàng chịu trách nhiệm thanh toán mọi khoản thuế và
                    / hoặc bất kỳ khoản phí nào khác có thể tích lũy liên quan đến các giao dịch của mình. Công ty sẽ
                    không cung cấp cho Khách hàng bất kỳ khuyến nghị pháp lý, thuế hoặc khác nào liên quan đến bất kỳ
                    giao dịch nào. Nếu Khách hàng có bất kỳ nghi ngờ nào về việc liệu họ có thể thực hiện bất kỳ nghĩa
                    vụ thuế nào hay không, họ phải tham khảo ý kiến của một chuyên gia độc lập.
                </p>
                <p>
                    17. Công ty không chịu trách nhiệm pháp lý đối với bất kỳ hành động hoặc thiếu sót nào của bất kỳ
                    bên thứ ba nào mà thông qua đó Khách hàng gửi tiền để bổ sung Tài khoản của Khách hàng hiện tại hoặc
                    Khách hàng rút khỏi Trang web.
                </p>
                <p>
                    18. Đôi khi, theo quyết định riêng của mình, Công ty có thể cung cấp cho Khách hàng thông tin,
                    khuyến nghị, tin tức, bình luận hoặc thông tin khác về thị trường cho mục đích thông tin. Nếu điều
                    này xảy ra:
                </p>
                <ul>
                    <li>
                        <p>- Công ty sẽ không chịu trách nhiệm về thông tin này;</p>
                    </li>
                    <li>
                        <p>- Công ty không đảm bảo về tính chính xác, đúng đắn và đầy đủ của các thông tin đó;</p>
                    </li>
                    <li>
                        <p>
                            - Thông tin này chỉ được cung cấp để cho phép Khách hàng đưa ra quyết định đầu tư của riêng
                            mình và không phải là lời khuyên đầu tư;
                        </p>
                    </li>
                    <li>
                        <p>
                            - Nếu một tài liệu có hạn chế liên quan đến con người hoặc loại người mà nó có ý định hoặc
                            mối quan tâm, Khách hàng đồng ý không chuyển thông tin này cho người hoặc loại người đó;
                        </p>
                    </li>
                    <li>
                        <p>
                            - Công ty không đảm bảo rằng Khách hàng sẽ nhận được thông tin trước khi nó bị lỗi thời.
                            Khách hàng quyết định việc sử dụng thông tin này trong việc đưa ra quyết định của riêng
                            mình. Thông tin do Công ty đăng có thể bị thay đổi hoặc xóa bất kỳ lúc nào mà không cần
                            thông báo trước cho Khách hàng.
                        </p>
                    </li>
                </ul>
                <p>
                    19. Công ty sẽ không tư vấn cho Khách hàng về khả năng sinh lời của một giao dịch hoặc tư vấn đầu tư
                    dưới bất kỳ hình thức nào ngoài việc cung cấp thông tin về tình trạng hiện tại của thị trường tài
                    chính. Các Tín hiệu Giao dịch mà Công ty cung cấp cho Khách hàng theo Thỏa thuận không phải là một
                    đề nghị và không phải là một khuyến nghị rõ ràng rằng Khách hàng tham gia vào các giao dịch thương
                    mại và / hoặc thực hiện giao dịch, không phải là thông tin khách quan và đáng tin cậy mà Công ty có
                    trách nhiệm với Khách hàng và các bên thứ ba, và không phải là tư vấn chuyên nghiệp. Bản thân Khách
                    hàng, với rủi ro của riêng mình, sẽ thực hiện các giao dịch và đưa ra quyết định phù hợp dựa trên
                    nhận định của riêng mình. Bằng cách gửi lệnh cho Công ty để thực hiện giao dịch, Khách hàng thừa
                    nhận rằng mình hoàn toàn chịu trách nhiệm về việc đánh giá và nghiên cứu độc lập của mình về các rủi
                    ro trong giao dịch. Khách hàng xác nhận rằng mình có đủ kiến ​​thức về thị trường, đã nhận được lời
                    khuyên chuyên môn, nếu cần, và có kinh nghiệm cần thiết để tự đánh giá về giá trị và rủi ro của bất
                    kỳ giao dịch nào. Xem xét những điều đã đề cập ở trên, Công ty khuyến nghị Khách hàng nên xem xét
                    cẩn thận liệu những rủi ro phát sinh khi thực hiện giao dịch có thể chấp nhận được hay không, có
                    tính đến mục đích và khả năng tài chính của Khách hàng. Tiết lộ này không nhằm mục đích ngăn cản
                    Khách hàng thực hiện các giao dịch (giao dịch với các tùy chọn) nhưng nhằm giúp Khách hàng đánh giá
                    rủi ro liên quan đến việc thực hiện các giao dịch đó và tiếp cận một cách có trách nhiệm với việc
                    lựa chọn chiến lược trong bối cảnh thực hiện Thỏa thuận với công ty.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h4 className="mb-4">
                <b>Risks Disclosure</b>
            </h4>
            <p>
                All Clients and potential Clients must carefully study this risk disclosure before completing
                registration on the Website or on the trading terminal and before they start making trades. The purpose
                of this Risk Disclosure (hereinafter Disclosure) is to disclose to the Client information about the
                risks associated with transactions on financial markets in general and with options in particular and to
                warn the Client about possible financial losses and related risks. The list of risks given in this
                Disclosure is not exhaustive because of the variety of possible situations that arise during
                transactions. This disclosure is for information purposes. It is meant to provide a general explanation
                of the risks associated with options.
            </p>
            <p>
                1. The Client acknowledges that option transactions are speculative and extremely risky investments and
                are suitable only for those investors who:
            </p>
            <ul>
                <li>
                    <p>- Understand and are prepared to assume economic, legal and other risks,</p>
                </li>
                <li>
                    <p>
                        - Taking into account their financial position, financial resources and obligations, can afford
                        the risk of losing what they invest,
                    </p>
                </li>
                <li>
                    <p>- Have sufficient knowledge to understand what option trades are.</p>
                </li>
            </ul>
            <p>
                The Company does not provide a Client with any recommendations or advice regarding options and does not
                give investment recommendations of any kind. The Client himself/ herself make the decision on a trading
                strategy and on specific actions based either on his/her understanding of the market or on consultations
                with independent financial advisers not affiliated with the Company. Options are derivative financial
                instruments, the price of which is derived from the prices of the underlying assets/ markets to which
                they are linked (e.g., currency, stock indices, stocks, metals, futures, etc.). For this reason it is
                extremely important that the client understand the risks associated with trading in the appropriate
                underlying asset/market. Some of these risks are:
            </p>
            <ul>
                <li>
                    <p>
                        - Volatility– movements in the underlying asset/market price can be unstable and unpredictable.
                        This fact has a direct impact on the Client's financial results. Understanding market volatility
                        allows the Client to analyze potential profits and work out a trading strategy.
                    </p>
                </li>
                <li>
                    <p>
                        - Market fluctuations – a sudden change in the price of the underlying asset from one level to
                        another. Various factors may cause abrupt changes (e.g., economic events or market
                        announcements). These factors may occur both when the market is open or when it is closed. When
                        these factors exist at the market close, the price for the underlying asset affected by that
                        factor at the market opening may considerably differ from the price for the underlying asset at
                        the market close. It may be impossible to close an open position at a beneficial price.
                    </p>
                </li>
                <li>
                    <p>This may result both in considerable losses and in considerable profit.</p>
                </li>
                <li>
                    <p>
                        - Liquidity: the value of options may depend on a number of factors, including, but not limited
                        to, a change in ratio of supply-and-demand; government, agricultural, commercial and trading
                        programs and strategies; national and international political and economic events; and the
                        prevailing psychological mood in the relevant market. Market conditions may change considerably
                        within a very short period of time and, consequently, in some markets it may be impossible for
                        the Client to make the anticipated profit.
                    </p>
                </li>
            </ul>
            <p>
                2. The Client assumes the risks of financial losses related to failures, interruptions, disconnection or
                malicious attacks of third persons with respect to information, communication, electric, electronic and
                other systems used to perform transactions.
            </p>
            <p>
                Among other risks, the Client assumes the following risks of losses caused by: -power and/or equipment
                failure on the part of the Client or the Client’s communication service provider (in particular voice
                communication);
            </p>
            <ul>
                <li>
                    <p>
                        - Physical damage (or destruction) of communication channels used for communication of the
                        Client’s provider and supplier (communication service provider) and the Client’s server;
                    </p>
                </li>
                <li>
                    <p>
                        - Failure (extremely low quality) of the transfer via channels used by the Client or channels
                        used by the supplier or communication service provider (in particular voice communication) used
                        by the Client;
                    </p>
                </li>
                <li>
                    <p>
                        - Use of communication channels, equipment and software that does not ensure receipt or timely
                        receipt of messages (in particular text messages) from the Company by the Client;
                    </p>
                </li>
                <li>
                    <p>
                        - Failure (extremely low quality) of communication via channels used by the Company, in
                        particular physical damage (destruction) of communication channels by third persons.
                    </p>
                </li>
            </ul>
            <p>
                3. The Client realizes that his/her trading activities may be exposed to risks associated with networks,
                including failures of hardware, software, servers, communication lines and the internet. Any such
                failure may result in non-fulfillment of the Client’s order in accordance with his/her orders. The
                Company will not be liable in case of such failure.
            </p>
            <p>
                4. The Client understands that the internet may be subject to events affecting his/ her access to the
                Company’s website and the trading terminal, including, but not limited to, interruptions or failures of
                software and hardware, internet outage, power outage or hacker attacks. The Company assumes no liability
                for any damages or losses resulting from events that are beyond its control or for any other damages,
                expenses, liabilities (including, but not limited to, lost profit) that may result from Client’s
                inability to access the Company’s website or a delay in or failure to send orders.
            </p>
            <p>
                5. When trading via the trading terminal, the Client assumes the risks of financial losses that may
                arise as a result of: - hardware and software failures, device failures, and poor quality of
                telecommunication services on the part of the Client; - malfunctioning of the Client’s equipment.
            </p>
            <p>
                6. The Client acknowledges that in abnormal market conditions the processing time for clients’ orders
                may increase.
            </p>
            <p>
                7. The Client acknowledges that only one request or order may be in the queue of requests/orders on the
                server. Any attempt to send a new request or order will be rejected.
            </p>
            <p>
                8. The Client acknowledges that the only reliable source of information about asset prices is the
                Company Server. Asset prices on the Client's trading terminal cannot be used as a reliable source of
                price information because, if the connection between the Client's trading terminal and the Company
                Server becomes unstable, some asset quotes may not reach the Client's trading terminal.
            </p>
            <p>
                9. The Client acknowledges that closing a web browser window will not cancel an order or a request that
                has already been received by the Company for processing.
            </p>
            <p>
                10. The Client assumes the risk of making unplanned trades if he/she re-sends an order before receiving
                information about the result of processing of the previous order.
            </p>
            <p>
                11. The Client assumes the risk of any financial losses caused by his/her failure to receive or delayed
                receipt of any message from the Company.
            </p>
            <p>
                12. The Client acknowledges that information sent via unencrypted e-mail is not protected against
                unauthorized access.
            </p>
            <p>
                13. The Client assumes fully responsibility for maintaining the confidentiality of information received
                by him/her from the Company and assumes the risk of any financial losses caused by unauthorized third
                party access to his/her trading account. The Company assumes no liability for unauthorized third party
                access to information, including e-mails, electronic communications, personal data, and access data that
                occurred at the time of transmission between the Company or any other party via the Internet or other
                communication networks, telephone or any other electronic means.
            </p>
            <p>
                14. The Client assumes the risk of financial losses (damages) caused by force majeure events, which are
                defined as any action, event or phenomenon, including, but not limited to:
            </p>
            <ul>
                <li>
                    <p>
                        - Strikes, mass rioting or civil unrest, terrorist attacks, wars, natural disasters, accidents,
                        fires, floods, storms, hurricanes, blackouts, communication, software or electronic equipment
                        failures that, in the reasonable opinion of the Company, resulted in destabilization of the
                        market or markets of one or several instruments;
                    </p>
                </li>
                <li>
                    <p>
                        - Suspension, liquidation or closure of any market or absence of any event on which price
                        quotations were based by the Company, or imposition of restrictions or special or non-standard
                        trade conditions, as well as performing transactions in any market or with respect to any such
                        event.
                    </p>
                </li>
            </ul>
            <p>
                15. The Client assumes financial and other risks in cases where transactions (and related actions) on
                financial markets is forbidden or restricted by the legislation of the country of the Client’s permanent
                residence.
            </p>
            <p>
                16. The Company does not guarantee that the Client's activities related to option trading are not or
                will not become subject to taxation in the future. The Client assumes responsibility for payment of any
                taxes and/or any other charges that may accrue with respect to his/her trades. The Company will not give
                the Client any legal, tax or other recommendations with respect to any trade. If the Client has any
                doubts as to whether he/she can assume any tax obligations, he/she must consult an independent expert.
            </p>
            <p>
                17. The Company assumes no liability for any actions or omissions by any third party through which money
                is sent by the Client to replenish the current Client's Account or withdrawn by the Client from the
                Website.
            </p>
            <p>
                18. From time to time, at its sole discretion, the Company may provide the Client with information,
                recommendations, news, commentary or other information about the market for information purposes. If
                this happens:
            </p>
            <ul>
                <li>
                    <p>- The Company will not be responsible for this information;</p>
                </li>
                <li>
                    <p>
                        - The Company gives no guarantees regarding the accuracy, correctness and completeness of such
                        information;
                    </p>
                </li>
                <li>
                    <p>
                        - This information is provided only to enable the Client to make his/her own investment
                        decisions and is not investment advice;
                    </p>
                </li>
                <li>
                    <p>
                        - If a document contains a restriction in relation to the person or the category of persons for
                        whom it is intended or concerns, the Client agrees not to pass this information to such person
                        or category of persons;
                    </p>
                </li>
                <li>
                    <p>
                        - The Company does not guarantee that the Client will receive information before it becomes
                        outdated. The Client decides on the use of this information in decision making on his/her own.
                        Information posted by the Company may be changed or deleted at any time without additional prior
                        notification to the Client.
                    </p>
                </li>
            </ul>
            <p>
                19. The Company will not advise the Client on the profitability of a transaction or provide investment
                advice in any form other than providing information on the current state of the financial market. The
                Trading Signals that the Company provides the Client under the Agreement are not an offer and are not an
                explicit recommendation that the Client engage in trading transactions and/or make trades, are not
                objective and reliable information for which the Company is liable to the Client and third parties, and
                are not professional consulting. The Client himself, at his own risk, will make trades and make
                appropriate decisions based on his own judgment. By sending an order to the Company to make a trade, the
                Client acknowledges that he is fully responsible for his own independent assessment and research on the
                risks of the trade. The Client confirms that he has enough market knowledge, has received, if necessary,
                professional advice, and has the necessary experience to make his own assessment of the merits and risks
                of any transaction. Taking into account the aforesaid, the Company recommends that the Client carefully
                consider whether the risks that arise when making transactions are acceptable, taking into consideration
                the Client’s purposes and financial capabilities. This Disclosure is not intended to dissuade the Client
                from carrying out transactions (trades with options) but is intended to help the Client assess the risks
                associated with carrying out those transactions and responsibly approach the selection of a strategy
                within the context of performing the Agreement with the Company.
            </p>
        </div>
    );
}
