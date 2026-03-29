import List "mo:core/List";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Int "mo:core/Int";



actor {
  type Consultation = {
    id : Nat;
    name : Text;
    email : Text;
    phone : ?Text;
    message : Text;
    timestamp : Time.Time;
    status : Text;
  };

  module Consultation {
    public func compareByTimestampDescending(consultation1 : Consultation, consultation2 : Consultation) : Order.Order {
      Int.compare(consultation2.timestamp, consultation1.timestamp);
    };
  };

  var nextId = 1;
  let consultations = List.empty<Consultation>();
  var pageVisitCount = 0;

  // Submit a new consultation form entry
  public shared ({ caller }) func submitConsultation(name : Text, email : Text, phone : ?Text, message : Text) : async Nat {
    let consultation : Consultation = {
      id = nextId;
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
      status = "new";
    };
    consultations.add(consultation);
    nextId += 1;
    consultation.id;
  };

  // Get all submissions sorted by newest first
  public query ({ caller }) func getAllConsultations() : async [Consultation] {
    consultations.toArray().sort(Consultation.compareByTimestampDescending);
  };

  // Update the status of a submission by id
  public shared ({ caller }) func updateConsultationStatus(id : Nat, newStatus : Text) : async Bool {
    let found = consultations.any(func(c) { c.id == id });
    if (not found) { return false };

    let updatedConsultations = consultations.map<Consultation, Consultation>(
      func(consultation) {
        if (consultation.id == id) {
          { consultation with status = newStatus };
        } else {
          consultation;
        };
      }
    );

    consultations.clear();
    consultations.addAll(updatedConsultations.values());
    true;
  };

  // Record a page visit
  public shared ({ caller }) func recordPageVisit() : async () {
    pageVisitCount += 1;
  };

  // Get the total page visit count
  public query ({ caller }) func getPageVisitCount() : async Nat {
    pageVisitCount;
  };
};
