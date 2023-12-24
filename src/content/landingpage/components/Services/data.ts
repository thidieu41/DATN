export interface IService {
  id: number;
  title: string;
  urlImg: string;
  subdata: {
    subtitle: string;
    subContent: string;
    listContent: string[];
    subImg: string;
  }[];
}
export const servicesList = [
  {
    id: 1,
    urlImg: '/static/images/services/cay-ghep-implant-1.jpg',
    title: 'Cấy ghép Implant',
    subdata: [
      {
        subtitle: '',
        subContent:
          'Cấy ghép implant , hay còn gọi là cấy ghép nha khoa , là phẩu thuật cấy một hay nhiều trụ bằng kim loại hay vật liệu sinh học vào xương hàm và từ dó làm phục hình cố định hay tháo lắp để thay thế răng đã mất . Nhờ có implant , mà việc mất răng không còn là nỗi lo phải mài các răng hoặc các bất tiện khi làm các loại phục hình khác cho bệnh nhân. <br/> Ngày nay đa phần trụ implant được làm bằng titanium là vật liệu kim loại có tính tương hợp sinh học cao với xương . Do đó nếu được chăm sóc kĩ và đúng cách , răng cấy ghép có thể tồn tại lên đến hàng chục năm , thậm chí suốt đời .',
        subImg: '/static/images/services/cay-ghep-implant-1.jpg',
        listContent: []
      },

      {
        subtitle: 'VÌ SAO CHỌN CẤY GHÉP IMPLANT',
        subContent:
          'Implant dùng chân răng nhân tạo cắm chặt trong xương hàm , nâng đỡ phục hình ; mang lại cho các bạn phục hình như răng thật , phục hồi chức năng nhai , nói ... đặc biệt chức năng thẩm mỹ cao như răng thật . Ngoài ra , cấy ghép implant còn tránh việc tổn hại các răng bên cạnh răng mất ( không cần mài các răng cạnh bên khi làm cầu răng cố định ) . Ngay cả trong trường hợp mất toàn bộ răng , với kĩ thuật All on 4 , bạn vẫn có thể có một hàm răng như ý mà không phải chịu những bất tiện như khi mang tháo lắp toàn hàm ',
        subImg: '',
        listContent: []
      },
      {
        subtitle: 'VÌ SAO NÊN CHỌN CẤY GHÉP IMPLANT TẠI NHA KHOA THANH SƠN',
        subContent:
          'Tại Nha khoa Thanh Sơn , sau khi chụp citi toàn hàm và xét nghiệm sức khỏe tổng quát , bạn sẽ được',
        listContent: [''],
        subImg:
          'https://nhakhoathanhson.com/user-upload/imgs/cay-ghep-implant-2.jpg'
      },
      {
        subtitle: 'QUY TRÌNH CẤY GHÉP IMPLANT TẠI NHA KHOA THANH SƠN',
        subContent:
          'Tại Nha khoa Thanh Sơn , chúng tôi có đội ngũ tư vấn tận tâm , luôn đặt lợi ích của khách hàng lên hàng đầu ; có nhiều gói dịch vụ với chi phí tiết kiệm và ưu đãi nhất cho quý khách chọn lựa ; với chất lượng tối ưu , giá chỉ từ 12tr/ trụ implant ',
        subImg: '',
        listContent: [
          'Khám tổng quát tình hình răng miệng',
          'Chụp citi hàm mặt và làm các xét nghiệm cơ bản',
          'Khám lần 2 để đưa ra các phương án cấy ghép phù hợp cho bạn chọn lựa.',
          'Lấy dấu để làm máng hướng dẫn cấy ghép implant . ',
          'Cấy ghép implant ',
          'Khám theo dõi sát quá trình tích hợp của trụ implant ',
          'Làm mão sứ hoặc hàm trên trụ implant đã tích hợp tốt trong xương hàm .',
          'Tái khám và vệ sinh vùng răng implant định kì tại NK Thanh Sơn'
        ]
      }
    ]
  },
  {
    id: 2,
    urlImg: '/static/images/services/boc-rang-su-tham-my-1.jpg',
    title: 'Bọc răng sứ thẩm mỹ',
    subdata: [
      {
        subtitle: '',
        subContent:
          'Bọc răng sứ thẩm mỹ là giải pháp giúp răng trắng đẹp chắc khỏe , được nhiều khách hàng tin dùng và chọn lựa. Nói một cách đơn giản , có thể xem đây là thủ thuật " mặc áo mới cho răng " , mang đến cho răng một dáng vẻ mới , đẹp và đều đặn như răng thật , trong khoảng thời gian giới hạn ngắn nhất mà bạn có được ',
        subImg: '/static/images/services/boc-rang-su-tham-my-1.jpg',
        listContent: []
      },
      {
        subtitle: 'BỌC RĂNG SỨ LÀ GÌ ?',
        subContent:
          'Bọc răng sứ là kĩ thuật lắp một thân răng sứ lên trên cùi răng được mài từ răng thật ( do răng sâu vỡ lớn , không bảo đảm lưu giữ miếng trám , hoặc chỉnh lại những lệch lạc hay giảm hô móm ở những khách hàng không đủ thời gian cho việc chỉnh nha )  Bọc răng sứ sẽ trả lại hình dáng , màu sắc như răng thật , đạt tính thẩm mỹ cao , tăng cường sức nhai , bảo vệ răng trước tác động của vi khuẩn , giúp răng bền chắc và tồn tại lâu trên cung hàm.',
        subImg: '',
        listContent: []
      },
      {
        subtitle: 'BỌC RĂNG SỨ TẠI NHA KHOA THANH SƠN',
        subContent: `Nha khoa Thanh Sơn tự hào là một địa chỉ uy tín , đáng tin cậy cho quý khách khi chọn lựa bọc răng sứ .
  
          Với các bác sĩ giàu kinh nghiệm , thiết bị hiện đại , cẩn trọng trong từng khâu của tiến trình bọc răng ; vật liệu chọn lọc từ các hãng nha khoa uy tín trên thế giới ( Đức , Mỹ , Nhật ... )
          
          Thời gian bọc răng sứ thẩm mỹ tại Nha khoa Thanh Sơn từ 2 - 6 ngày .
          
          Nha khoa Thanh Sơn với giá cả hợp lý , chế độ bảo dưỡng , bảo hành uy tín và tốt nhất , sẽ mang lại sự an tâm cho quý khách khi chọn lựa đến với chúng tôi .`,
        subImg: '',
        listContent: []
      },
      ,
      {
        subtitle: 'BẢNG GIÁ THAM KHẢO   ( chưa khuyến mãi ) ',
        subContent:
          'Dòng sứ không kim loại Lava Plus tại Nha khoa Thanh Sơn là vật liệu phục hình resin nano ceramic đầu tiên trên thế giới cho kết quả vượt trội về độ bền và tính thẩm mỹ , cũng như độ chịu lực trong ăn nhai , chống mòn và chống đổi màu , được nhiều khách hàng tin dùng .',
        subImg: '',
        listContent: [
          'Răng sứ kim loại Mỹ   1tr / răng Bh 3 năm',
          'Răng sứ Titan Mỹ   2tr / răng Bh 5 năm ',
          'Răng toàn sứ Ziconia   3tr500 / răng Bh 10 năm ',
          'Răng toàn sứ Cercon HT  4tr / răng Bh 7 năm ',
          'Răng toàn sứ Emax  4tr / răng Bh 5 năm',
          'Răng toàn sứ Lava Plus   6tr / răng Bh 15 năms'
        ]
      },
      ,
      {
        subtitle: 'TẠI SAO NÊN CHỌN BỌC RĂNG SỨ THẨM MỸ TẠI NHA KHOA THANH SƠN',
        subContent: 'Bọc răng sứ tại Nha khoa Thanh Sơn uy tín - chất lượng .',
        subImg: '',
        listContent: [
          'Đội ngũ bác sĩ giàu kinh nghiệm , tận tâm .',
          'Thiết bị , công nghệ hiện đại .',
          'Vật liệu chọn lọc , với tay nghề kĩ thuật viên cao bảo đảm là hài lòng quý khách .',
          'Đảm bảo các khâu vô trùng an toàn và đúng chuẩn .',
          'Giá cả hợp lý ',
          'Chế độ bảo dưỡng , bảo hành uy tín và tốt nhất sẽ mang lại sự an tâm cao cho quý khách .'
        ]
      }
    ]
  },
  {
    id: 3,
    urlImg: '/static/images/services/danh-bong-rang.jpg',
    title: 'Đánh bóng, cạp vôi răng',
    subdata: [
      {
        subtitle: '',
        subContent: `Quá trình ăn nhai, chải răng không đúng cách ... lâu ngày sẽ tạo mảng bám, cao răng tích tụ gây viêm nướu, chảy máu lợi răng và hơi thở có mùi.
  
          Đến với Nha khoa Thanh Sơn , bên cạnh việc lấy sạch vôi bằng máy siêu âm nhẹ nhàng , không gây ê buốt , kết hợp đánh bóng 2 hàm sau công đoạn lấy vôi , trả lại cho bạn một hàm răng sạch đẹp , hơi thở thơm mát ; bạn sẽ được tư vấn và hướng dẫn kĩ thuật vệ sinh răng miệng đúng cách , bảo đảm cho răng nướu bạn luôn chắc khỏe.
          
          Theo như khuyến cáo của các chuyên gia chăm sóc sức khỏe răng miệng hàng đầu trên thế giới, mỗi cá nhân nên đến phòng khám để lấy vôi răng định kỳ 6 tháng/lần để duy trì sức khỏe răng miệng`,
        subImg: '/static/images/services/danh-bong-rang.jpg',
        listContent: []
      }
    ]
  },
  {
    id: 4,
    urlImg: '/static/images/services/taytrang.webp',
    title: 'Tẩy trắng răng nhanh',
    subdata: [
      {
        subtitle: '',
        subContent: `Tẩy trắng răng nhanh tại Đà Nẵng hiệu quả trong vòng 1 giờ với LumaCool, công nghệ tiên tiến của USA-Mỹ.
  
          Răng ố vàng theo thời gian làm bạn dần thiếu tự tin khi giao tiếp? Hay nụ cười đang dần mất đi khỏi khuôn mặt của bạn? Hãy chọn phương pháp tẩy trắng răng nhanh bằng đèn LumaCool tại Nha khoa Thanh Sơn. Đến với chúng tôi, bạn sẽ được trả lại sự tự tin với nụ cười rạng rỡ tươi trẻ với công nghệ tẩy trắng răng nhanh và ưu việt.
          
          Sau khi khám và được bác sĩ tư vấn tận tâm, bạn sẽ được giới thiệu các gói tẩy trắng răng nào phù hợp nhất cho bản thân mình.`,
        subImg: '',
        listContent: []
      },
      {
        subtitle: 'Ưu điểm của đèn tẩy trắng LumaCool-USA:',
        subContent: `Đến với Nha khoa Thanh Sơn, chúng tôi sẽ làm hài lòng cho từng quý khách hàng có nhu cầu thẩm mỹ cao nhất.
  
          Với đèn tẩy công nghệ Luma Cool, với vật liệu tẩy răng cao cấp nhập khẩu từ các nước tiên tiến trong lĩnh vực nha khoa, chúng tôi sẽ làm hài lòng các bạn với yêu cầu thẩm mỹ cao nhất cho từng mỗi bệnh nhân. Sau khi tẩy, bạn sẽ được hướng dẫn để có thể duy trì màu răng trắng dẹp của bạn ở mức thời gian lâu nhất có thể.`,
        subImg:
          'https://nhakhoathanhson.com/user-upload/imgs/tay-trang-rang-nhanh-tai-da-nang.jpg',
        listContent: [
          'Thời gian nhanh chóng, chỉ trong 1 giờ',
          'Thuốc tẩy được nhập khẩu trực tiếp từ Mỹ.',
          'Thời gian bền màu kéo dài.'
        ]
      }
    ]
  },
  {
    id: 5,
    urlImg: '/static/images/services/nieng-rang.webp',
    title: 'Niềng răng chỉnh nha',
    subdata: [
      {
        subtitle: '',
        subContent:
          'Niềng răng - chỉnh răng hô , móm tại Nha khoa Thanh Sơn với công nghệ mới :',
        subImg: '',
        listContent: [
          'Invisalign ( niềng răng bằng khay trong suốt )  ',
          'Mắc cài sứ pha lê  ',
          'Kĩ thuật dây cung thẳng liên tục ',
          'Nong hàm   Sẽ mang lại một hàm răng đều đẹp , nụ cười hoàn hảo , cải thiện hình dáng khuôn mặt như mong muốn cho quý khách .'
        ]
      },
      {
        subtitle: 'Với các ưu điểm nổi bật :  ',
        subContent: '',
        subImg:
          'https://nhakhoathanhson.com/user-upload/imgs/nieng-rang-chinh-nha.jpg',
        listContent: [
          'Không còn giới hạn độ tuổi chỉnh nha khi bạn đến với Nha khoa Thanh Sơn . ',
          'Bảo tồn răng thật tối đa , hạn chế nhổ răng ; tránh tái phát .  ',
          'Với viêc áp dụng các kĩ thuật mới trong chỉnh nha , cho bạn giao tiếp dễ dàng , bảo đảm tính thẩm mỹ cao trong suốt quá chình chỉnh nha . ',
          'Chi phí hợp lý , gói giá ưu đãi , hỗ trợ trả góp , thuận lợi cho quý khách hàng , đặc biệt là học sinh - sinh viên .'
        ]
      },
      {
        subtitle: '',
        subContent: `Đến với Nha khoa Thanh Sơn , bạn sẽ được khám và tư vấn công tâm . Sau khi có phim X quang dành cho chỉnh nha , bạn sẽ được lấy dấu hàm ( miễn phí ) để nghiên cứu , lên kế hoạch điều trị cụ thể 
          cho từng case riêng biệt . Trong suốt quá trình chỉnh , bạn sẽ được theo dõi sát sao bởi ê kíp tận tâm , chuyên nghiệp nhằm đưa đến một kết quả như ý cho bạn .  `,
        subImg:
          'https://nhakhoathanhson.com/user-upload/imgs/nieng-rang-chinh-nha-2.jpg',
        listContent: []
      },
      {
        subtitle: 'BẢNG GIÁ NIỀNG RĂNG ( chưa khuyến mãi )',
        subContent: '',
        subImg:
          'https://nhakhoabf.com/wp-content/uploads/2021/01/cau-tao-nieng-rang-la-gi.jpg',
        listContent: [
          'Khí cụ chỉnh nha tháo lắp 1tr - 5 tr',
          'Mắc cài kim loại 10tr - 30tr',
          'Mắc cài sứ pha lê 15tr - 35tr',
          'Chỉnh nha Invisalign 50tr - 150tr  ( niềng răng bằng khay trong suốt )',
          'Minivit 1tr500 / vít  * Khí cụ nong hàm 4tr500/ hàm'
        ]
      }
    ]
  },
  {
    id: 6,
    urlImg: '/static/images/services/dan-su.jpeg',
    title: 'Mặt dán Venner',
    subdata: [
      {
        subtitle: '',
        subContent: `Mắt dán sứ veneer là phương pháp thẩm mỹ nha khoa HOT nhất hiện nay với nhiều ưu điểm nổi trội , đem lại cho bạn một nụ cười đẹp rạng rỡ như mong muốn , với sự can thiệp lên răng tối thiểu nhất , có khi gần như là không mài răng , với độ bền chắc gần như răng thật . Hãy cùng Nha khoa Thanh Sơn tìm hiểu " mặt dán sứ veneer " .`,
        subImg: '/static/images/services/dan-su.jpeg',
        listContent: []
      },
      {
        subtitle: 'KHI NÀO NÊN CHỌN MẶT DÁN SỨ VENEER',
        subContent: `Mặt dán sứ veneer là dán một lớp mỏng sứ lên bề mặt men răng nhằm làm thay đổi hình dạng , màu sắc răng , tạo đường cười tự nhiên và đẹp nhất cho bạn.
  
          Bạn nên chọn mặt dán sứ veneer khi bạn có một cung răng tương đối đều đặn , với chất lượng men răng tốt và các tổn thương do sâu răng , khe răng thưa ở mức tối thiểu .
          
          Ra đời với sứ mệnh KHẮC PHỤC KHUYẾT ĐIỂM VỀ RĂNG , MANG LẠI NỤ CƯỜI TỰ NHIÊN RẠNG RỠ , mặt dán sứ veneer là phương pháp thẩm mỹ nha khoa hàng đầu mà bạn nên ưu tiên chọn lựa , với các ưu điểm vượt trội :`,
        subImg: '',
        listContent: [
          'Đem lại cho bạn một hàm răng trắng đẹp , một nụ cười tự nhiên rạng rỡ nhất như bạn hằng mong muốn.',
          'Do mặt dán sứ veneer là dán sứ lên bề mặt men răng nên tỉ lệ mài can thiệp lên mô răng là tối thiểu , không gây ê buốt răng . ,',
          'Độ bền lý tưởng gần như răng thật , màu sắc không thay đổi theo thời gian .'
        ]
      }
    ]
  },

  {
    id: 7,
    urlImg: '/static/images/services/nho-rang-khon-nieng-rang-1-1.jpg',
    title: 'Nhổ răng khôn công nghệ',
    subdata: [
      {
        subtitle: '',
        subContent: `Răng khôn là răng mọc sau cùng trên cung hàm, khi sự phát triển xương hàm đã gần như hoàn chỉnh, nên dễ dẫn đến tình trạng mọc lệch, gây đau nhức nhiều và tác hại đến các răng kế cận cũng như xô lệch dần các răng vùng răng cửa. Chính vì vậy khi phát hiện răng khôn lệch, cần thiết phải nhổ ngay cả trước khi xảy ra các biến chứng.
  
          Tuy nhiên nỗi sợ lớn nhất của bệnh nhân khi nhổ răng khôn lệch là đau nhức và sưng nề lớn sau nhổ; chưa kể đến những nguy hiểm do vị trí chân răng gần vùng thần kinh, mạch máu lớn của vùng hàm mặt.
          
          Đến với Nha khoa Thanh Sơn, với kinh nghiệm trên 30 năm lĩnh vực phẩu thuật hàm mặt của bs phụ trách chính phòng khám, cùng với việc áp dụng công nghệ nhổ bằng máy siêu âm Piezotome, mọi lo lắng của các bạn sẽ được xóa tan.`,
        subImg: '/static/images/services/nho-rang-khon-nieng-rang-1-1.jpg',
        listContent: []
      },
      {
        subtitle: 'Vì sao nên nhổ răng bằng Piezotome?',
        subContent: `Trước những ưu điểm vượt trội, Piezotome nhận được đánh giá cao của giới chuyên môn và là sự lựa chọn hàng đầu trong kỹ thuật nhổ răng (Nguồn: Piezotome Solo (LED) | SURGERY | EQUIPMENT | Acteon). 
  
          Tại NK Thanh Sơn chúng tôi hiện đã và đang áp dụng kĩ thuật này nhằm nâng cao chất lượng dịch vụ, hiệu quả phẫu thuật, đảm bảo an toàn và đáp ứng nhu cầu của các bạn.`,
        subImg:
          'https://nhakhoathanhson.com/user-upload/imgs/nho-rang-khon-cong-nghe-cao.jpg',
        listContent: [
          ' Không đau',
          ' An toàn',
          'Rút ngắn thời gian nhổ răng',
          'Mau chóng lành thương'
        ]
      },
      {
        subtitle: '',
        subContent: '',
        subImg: '',
        listContent: []
      }
    ]
  },
  {
    id: 8,
    urlImg: '/static/images/services/tram-rang.jpeg',
    title: 'Trám răng thẩm mỹ',
    subdata: [
      {
        subtitle: '',
        subContent: `Trám răng nhằm phục hồi các răng thương tổn ít, tránh tổn thương sâu đến tủy răng cho bệnh nhân. Các trường hợp răng sâu , mòn cổ răng do chải răng sai cách , răng mẻ bể trong quá trình ăn nhai , hoặc răng thưa kẻ nhưng bạn muốn phục hồi tính thẩm mỹ trong khoảng thời gian ngắn nhất ; thì trám răng thẫm mỹ là chọn lựa tối ưu và kinh tế nhất của bạn . 
  
          Đến với Nha khoa Thanh Sơn, bạn sẽ được khám, phục hồi răng mang tính thẩm mỹ cao với chi phí hợp lí nhất. Với tay nghề cao và sự tận tâm, cùng phương châm sự hài lòng của quý khách là động lực cho Nha khoa Thanh Sơn phấn đấu không ngừng, mong muốn được phục vụ ngày một tốt hơn cho các bạn.`,
        subImg: '/static/images/services/tram-rang.jpeg',
        listContent: []
      }
    ]
  },
  {
    id: 9,
    urlImg: '/static/images/services/dieu-tri-tuy.jpg',
    title: 'Điều trị nội nha, chữa tuỷ răng',
    subdata: [
      {
        subtitle: '',
        subContent:
          'Có lẽ chỉ khi chịu đựng cơn đau tủy răng, mới thấu đâu là “chạm đáy của nỗi đau”.',
        subImg: '/static/images/services/dieu-tri-tuy.jpg',
        listContent: []
      },
      {
        subtitle: '',
        subContent: `Với cấu tạo phức tạp và thay đổi trên từng răng, cùng hệ thống mạch máu nuôi dưỡng và thần kinh dẫn truyền phong phú đến từng răng, đến tận giới hạn men - ngà của mỗi răng, làm cơn đau tủy thật sự trở thành nỗi ám ảnh của bệnh nhân.
  
          Đến với Nha khoa Thanh Sơn, các bạn hãy yên tâm. Với phương châm " Xem nỗi đau bệnh nhân là nỗi đau của chính mình", cơn đau từng là nỗi ám ảnh của bạn sẽ biến mất với chuyên môn và sự tận tâm của đội ngũ nhân viên phòng khám.`,
        subImg:
          'https://www.nhakhoano1.com/wp-content/uploads/2018/07/20afdaa2cef0cf3642115b985fce27da-dental-images-health-education.jpg',
        listContent: []
      },
      {
        subtitle: '',
        subContent: `Điều trị nội nha là quá trình điều trị lấy sạch tủy bị tổn thương, trám bít chặt hệ thống ống tủy ngăn chặn sự xâm nhập của vi khuẩn, giúp loại bỏ viêm nhiễm và bảo tồn mô răng còn lại.
  
          Điều trị tủy có thể kết thúc trong một lần hẹn hoặc nhiều lần hẹn. Giữa các lần hẹn răng đang nội nha sẽ được trám tạm lại để thức ăn không chui vào răng gây thêm nhiễm trùng.
          
          Răng sau chữa tủy có thể sẽ được trám hay phải bọc mão, tái tạo cùi răng tuỳ thuộc vào mức độ mất chất của răng.`,
        subImg: '',
        listContent: []
      }
    ]
  }
];
