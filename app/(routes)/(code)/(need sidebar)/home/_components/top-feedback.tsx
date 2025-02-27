import FeedbackItem from "@/components/feedback-item";

const feedbacks = [
  {
    id: 1,
    desc: "desc dskjljsaldddddddddddkdflslk dslldsjfk sdkjlsdfkj sdkjlfsdj skdljsd dslkjfkj sdl jsdjk sldk dsk",
    username: "username",
    title: "title",
    likesCount: 4,
    commentsCount: 10,
    productName: "Verve",
    productRoute: `/route`,
  },
  {
    id: 2,
    desc: "desc dskjljsaldddddddddddkdflslk dslldsjfk sdkjlsdfkj sdkjlfsdj skdljsd dslkjfkj sdl jsdjk sldk dsk",
    username: "username",
    title: "title",
    likesCount: 4,
    commentsCount: 10,
    productName: "Verve",
    productRoute: `/route`,
  },
  {
    id: 3,
    desc: "desc dskjljsalkdflslk dslldsjfk sdkjlsdfkj sdkjlfsdj skdljsd dslkjfkj sdl jsdjk sldk dsk",
    tags: [{ type: "admin", name: "admin bad", id: "completed" }],
    username: "username",
    title: "title",
    likesCount: 4,
    commentsCount: 10,
    productName: "Verve",
    productRoute: `/route`,
  },
  {
    id: 4,
    desc: "desc dskjljsalkdflslk dslldsjfk sdkjlsdfkj sdkjlfsdj skdljsd dslkjfkj sdl jsdjk sldk dsk",
    tags: [{ type: "admin", name: "admin bad", id: "completed" }],
    username: "username",
    title: "title",
    likesCount: 4,
    commentsCount: 10,
    productName: "Verve",
    productRoute: `/route`,
  },
];

const TopFeedback = () => {
  return (
    <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-2 w-full gap-4">
      {feedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          desc={feedback.desc}
          username={feedback.username}
          title={feedback.title}
          likesCount={feedback.likesCount}
          commentsCount={feedback.commentsCount}
          productName={feedback.productName}
          productRoute={feedback.productRoute}
          tags={feedback.tags}
        />
      ))}
    </div>
  );
};

export default TopFeedback;
