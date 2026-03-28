import Text "mo:core/Text";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Array "mo:core/Array";
import List "mo:core/List";

actor {
  type ContactFormSubmission = {
    name : Text;
    email : Text;
    phone : ?Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactFormSubmission {
    public func compare(submission1 : ContactFormSubmission, submission2 : ContactFormSubmission) : Order.Order {
      Int.compare(submission2.timestamp, submission1.timestamp);
    };
  };

  let submissions = List.empty<ContactFormSubmission>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : ?Text, message : Text) : async () {
    let submission : ContactFormSubmission = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };
    submissions.add(submission);
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactFormSubmission] {
    submissions.toArray().sort();
  };
};
