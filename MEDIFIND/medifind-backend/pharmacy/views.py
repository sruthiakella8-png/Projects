from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
)
from rest_framework import status

from drf_spectacular.utils import extend_schema

from .models import (
    Pharmacy,
    PharmacyDocument,
    Medicine,
    Conversation,
    Message,
)

from .serializers import (
    PharmacyRegisterSerializer,
    PharmacyLoginSerializer,
    PharmacyProfileSerializer,
    PharmacyDocumentSerializer,
    MedicineSerializer,
    ConversationSerializer,
    MessageSerializer,
)

from rest_framework_simplejwt.views import TokenObtainPairView


# ============================================================
# PHARMACY REGISTRATION
# ============================================================

class PharmacyRegisterView(APIView):

    permission_classes = [
        AllowAny
    ]

    @extend_schema(request=PharmacyRegisterSerializer)

    def post(self, request):

        serializer = PharmacyRegisterSerializer(
            data=request.data
        )

        if serializer.is_valid():

            pharmacy = serializer.save()

            return Response(
                {
                    "message":
                        "Pharmacy registered successfully.",

                    "pharmacy_id":
                        pharmacy.id,

                    "pharmacy_name":
                        pharmacy.pharmacy_name,

                    "verification_status":
                        pharmacy.verification_status,
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

# ============================================================
# PHARMACY LOGIN
# ============================================================

class PharmacyLoginView(TokenObtainPairView):

    permission_classes = [AllowAny]

    serializer_class = PharmacyLoginSerializer


# ============================================================
# PHARMACY PROFILE CRUD
# ============================================================

class PharmacyProfileView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get_pharmacy(self, request):

        try:

            return Pharmacy.objects.get(
                owner=request.user
            )

        except Pharmacy.DoesNotExist:

            return None

    # READ

    def get(self, request):

        pharmacy = self.get_pharmacy(
            request
        )

        if pharmacy is None:

            return Response(
                {
                    "error":
                        "Pharmacy profile not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = PharmacyProfileSerializer(
            pharmacy
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    # UPDATE

    def put(self, request):

        pharmacy = self.get_pharmacy(
            request
        )

        if pharmacy is None:

            return Response(
                {
                    "error":
                        "Pharmacy profile not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = PharmacyProfileSerializer(
            pharmacy,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message":
                        "Pharmacy profile updated successfully.",

                    "data":
                        serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # PARTIAL UPDATE

    def patch(self, request):

        pharmacy = self.get_pharmacy(
            request
        )

        if pharmacy is None:

            return Response(
                {
                    "error":
                        "Pharmacy profile not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = PharmacyProfileSerializer(
            pharmacy,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message":
                        "Pharmacy profile updated successfully.",

                    "data":
                        serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # DELETE

    def delete(self, request):

        pharmacy = self.get_pharmacy(
            request
        )

        if pharmacy is None:

            return Response(
                {
                    "error":
                        "Pharmacy profile not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        request.user.delete()

        return Response(
            {
                "message":
                    "Pharmacy account deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT
        )


# ============================================================
# PHARMACY DOCUMENTS
# ============================================================

class PharmacyDocumentView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    parser_classes = [
        MultiPartParser,
        FormParser
    ]

    def get_pharmacy(self, request):

        try:

            return Pharmacy.objects.get(
                owner=request.user
            )

        except Pharmacy.DoesNotExist:

            return None

    # GET DOCUMENTS

    def get(self, request):

        pharmacy = self.get_pharmacy(
            request
        )

        if pharmacy is None:

            return Response(
                {
                    "error":
                        "Pharmacy profile not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        documents = PharmacyDocument.objects.filter(
            pharmacy=pharmacy
        ).order_by("-uploaded_at")

        serializer = PharmacyDocumentSerializer(
            documents,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    # UPLOAD DOCUMENT

    def post(self, request):

        pharmacy = self.get_pharmacy(
            request
        )

        if pharmacy is None:

            return Response(
                {
                    "error":
                        "Pharmacy profile not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = PharmacyDocumentSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(
                pharmacy=pharmacy
            )

            return Response(
                {
                    "message":
                        "Document uploaded successfully.",

                    "data":
                        serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# ============================================================
# DELETE DOCUMENT
# ============================================================

class PharmacyDocumentDeleteView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def delete(
        self,
        request,
        document_id
    ):

        try:

            pharmacy = Pharmacy.objects.get(
                owner=request.user
            )

            document = PharmacyDocument.objects.get(
                id=document_id,
                pharmacy=pharmacy
            )

        except (
            Pharmacy.DoesNotExist,
            PharmacyDocument.DoesNotExist
        ):

            return Response(
                {
                    "error":
                        "Document not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        document.delete()

        return Response(
            {
                "message":
                    "Document deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT
        )


# ============================================================
# MEDICINE CRUD
# ============================================================

class PharmacyMedicineListCreateView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    parser_classes = [
        MultiPartParser,
        FormParser
    ]

    # --------------------------------------------------------
    # GET ALL MEDICINES OF LOGGED-IN PHARMACY
    # --------------------------------------------------------

    def get(self, request):

        try:

            pharmacy = Pharmacy.objects.get(
                owner=request.user
            )

        except Pharmacy.DoesNotExist:

            return Response(
                {
                    "error":
                        "Pharmacy profile not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        search = request.query_params.get(
            "search"
        )

        medicines = Medicine.objects.filter(
            pharmacy=pharmacy
        )

        if search:

            medicines = medicines.filter(

                Q(medicine_name__icontains=search)
                |
                Q(generic_name__icontains=search)
                |
                Q(category__icontains=search)
                |
                Q(manufacturer__icontains=search)
            )

        medicines = medicines.order_by(
            "-created_at"
        )

        serializer = MedicineSerializer(
            medicines,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    # --------------------------------------------------------
    # ADD MEDICINE
    # --------------------------------------------------------

    def post(self, request):

        try:

            pharmacy = Pharmacy.objects.get(
                owner=request.user
            )

        except Pharmacy.DoesNotExist:

            return Response(
                {
                    "error":
                        "Pharmacy profile not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if pharmacy.verification_status != "APPROVED":

            return Response(
                {
                    "error":
                        "Only approved pharmacies can add medicines."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = MedicineSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(
                pharmacy=pharmacy
            )

            return Response(
                {
                    "message":
                        "Medicine added successfully.",

                    "data":
                        serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# ============================================================
# MEDICINE DETAIL
# UPDATE / DELETE
# ============================================================

class PharmacyMedicineDetailView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    parser_classes = [
        MultiPartParser,
        FormParser
    ]

    def get_medicine(
        self,
        request,
        medicine_id
    ):

        try:

            pharmacy = Pharmacy.objects.get(
                owner=request.user
            )

            return Medicine.objects.get(
                id=medicine_id,
                pharmacy=pharmacy
            )

        except (
            Pharmacy.DoesNotExist,
            Medicine.DoesNotExist
        ):

            return None

    # --------------------------------------------------------
    # GET ONE MEDICINE
    # --------------------------------------------------------

    def get(
        self,
        request,
        medicine_id
    ):

        medicine = self.get_medicine(
            request,
            medicine_id
        )

        if medicine is None:

            return Response(
                {
                    "error":
                        "Medicine not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = MedicineSerializer(
            medicine
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    # --------------------------------------------------------
    # UPDATE
    # --------------------------------------------------------

    def put(
        self,
        request,
        medicine_id
    ):

        medicine = self.get_medicine(
            request,
            medicine_id
        )

        if medicine is None:

            return Response(
                {
                    "error":
                        "Medicine not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = MedicineSerializer(
            medicine,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message":
                        "Medicine updated successfully.",

                    "data":
                        serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # --------------------------------------------------------
    # PARTIAL UPDATE
    # --------------------------------------------------------

    def patch(
        self,
        request,
        medicine_id
    ):

        medicine = self.get_medicine(
            request,
            medicine_id
        )

        if medicine is None:

            return Response(
                {
                    "error":
                        "Medicine not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = MedicineSerializer(
            medicine,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message":
                        "Medicine updated successfully.",

                    "data":
                        serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # --------------------------------------------------------
    # DELETE
    # --------------------------------------------------------

    def delete(
        self,
        request,
        medicine_id
    ):

        medicine = self.get_medicine(
            request,
            medicine_id
        )

        if medicine is None:

            return Response(
                {
                    "error":
                        "Medicine not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        medicine.delete()

        return Response(
            {
                "message":
                    "Medicine deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT
        )


# ============================================================
# CUSTOMER - CREATE / LIST CONVERSATIONS
# ============================================================

class CustomerConversationView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    # --------------------------------------------------------
    # GET CUSTOMER CONVERSATIONS
    # --------------------------------------------------------

    def get(self, request):

        conversations = Conversation.objects.filter(
            customer=request.user
        ).select_related(
            "pharmacy"
        ).order_by(
            "-updated_at"
        )

        serializer = ConversationSerializer(
            conversations,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    # --------------------------------------------------------
    # START CONVERSATION
    # --------------------------------------------------------

    def post(self, request):

        pharmacy_id = request.data.get(
            "pharmacy_id"
        )

        if not pharmacy_id:

            return Response(
                {
                    "error":
                        "pharmacy_id is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            pharmacy = Pharmacy.objects.get(
                id=pharmacy_id
            )

        except Pharmacy.DoesNotExist:

            return Response(
                {
                    "error":
                        "Pharmacy not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if pharmacy.verification_status != "APPROVED":

            return Response(
                {
                    "error":
                        "You can only contact an approved pharmacy."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        conversation, created = Conversation.objects.get_or_create(

            customer=request.user,

            pharmacy=pharmacy
        )

        serializer = ConversationSerializer(
            conversation
        )

        return Response(
            {
                "message":
                    "Conversation created successfully."
                    if created
                    else
                    "Conversation already exists.",

                "data":
                    serializer.data
            },
            status=status.HTTP_201_CREATED
            if created
            else status.HTTP_200_OK
        )


# ============================================================
# CUSTOMER - VIEW CONVERSATION MESSAGES
# ============================================================

class CustomerConversationDetailView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request,
        conversation_id
    ):

        try:

            conversation = Conversation.objects.get(
                id=conversation_id,
                customer=request.user
            )

        except Conversation.DoesNotExist:

            return Response(
                {
                    "error":
                        "Conversation not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        messages = conversation.messages.all().order_by(
            "created_at"
        )

        serializer = MessageSerializer(
            messages,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    # CUSTOMER SEND MESSAGE

    def post(
        self,
        request,
        conversation_id
    ):

        try:

            conversation = Conversation.objects.get(
                id=conversation_id,
                customer=request.user
            )

        except Conversation.DoesNotExist:

            return Response(
                {
                    "error":
                        "Conversation not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        message_text = request.data.get(
            "message"
        )

        if not message_text:

            return Response(
                {
                    "error":
                        "Message is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        message = Message.objects.create(

            conversation=conversation,

            sender=request.user,

            message=message_text,

            attachment=request.FILES.get(
                "attachment"
            )
        )

        conversation.save()

        serializer = MessageSerializer(
            message
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


# ============================================================
# PHARMACY - INBOX
# ============================================================

class PharmacyConversationView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    # --------------------------------------------------------
    # GET ALL CUSTOMER CONVERSATIONS
    # --------------------------------------------------------

    def get(self, request):

        try:

            pharmacy = Pharmacy.objects.get(
                owner=request.user
            )

        except Pharmacy.DoesNotExist:

            return Response(
                {
                    "error":
                        "Pharmacy profile not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        conversations = Conversation.objects.filter(
            pharmacy=pharmacy
        ).select_related(
            "customer"
        ).order_by(
            "-updated_at"
        )

        serializer = ConversationSerializer(
            conversations,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


# ============================================================
# PHARMACY - VIEW / REPLY TO CONVERSATION
# ============================================================

class PharmacyConversationDetailView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get_conversation(
        self,
        request,
        conversation_id
    ):

        try:

            pharmacy = Pharmacy.objects.get(
                owner=request.user
            )

            return Conversation.objects.get(
                id=conversation_id,
                pharmacy=pharmacy
            )

        except (
            Pharmacy.DoesNotExist,
            Conversation.DoesNotExist
        ):

            return None

    # --------------------------------------------------------
    # VIEW MESSAGES
    # --------------------------------------------------------

    def get(
        self,
        request,
        conversation_id
    ):

        conversation = self.get_conversation(
            request,
            conversation_id
        )

        if conversation is None:

            return Response(
                {
                    "error":
                        "Conversation not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        messages = conversation.messages.all().order_by(
            "created_at"
        )

        serializer = MessageSerializer(
            messages,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    # --------------------------------------------------------
    # PHARMACY REPLY
    # --------------------------------------------------------

    def post(
        self,
        request,
        conversation_id
    ):

        conversation = self.get_conversation(
            request,
            conversation_id
        )

        if conversation is None:

            return Response(
                {
                    "error":
                        "Conversation not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        message_text = request.data.get(
            "message"
        )

        if not message_text:

            return Response(
                {
                    "error":
                        "Message is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        message = Message.objects.create(

            conversation=conversation,

            sender=request.user,

            message=message_text,

            attachment=request.FILES.get(
                "attachment"
            )
        )

        conversation.save()

        serializer = MessageSerializer(
            message
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


# ============================================================
# MARK MESSAGE AS READ
# ============================================================

class PharmacyMessageReadView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def patch(
        self,
        request,
        message_id
    ):

        try:

            pharmacy = Pharmacy.objects.get(
                owner=request.user
            )

            message = Message.objects.get(
                id=message_id,
                conversation__pharmacy=pharmacy
            )

        except (
            Pharmacy.DoesNotExist,
            Message.DoesNotExist
        ):

            return Response(
                {
                    "error":
                        "Message not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        message.is_read = True

        message.save()

        return Response(
            {
                "message":
                    "Message marked as read."
            },
            status=status.HTTP_200_OK
        )


# ============================================================
# ADMIN - ALL PHARMACIES
# ============================================================

class AdminPharmacyListView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        if request.user.role != "admin":

            return Response(
                {
                    "error":
                        "Only admin can access this API."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        pharmacies = Pharmacy.objects.all().order_by(
            "-created_at"
        )

        serializer = PharmacyProfileSerializer(
            pharmacies,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


# ============================================================
# ADMIN - APPROVE
# ============================================================

class AdminApprovePharmacyView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(
        self,
        request,
        pharmacy_id
    ):

        if request.user.role != "admin":

            return Response(
                {
                    "error":
                        "Only admin can approve pharmacies."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        try:

            pharmacy = Pharmacy.objects.get(
                id=pharmacy_id
            )

        except Pharmacy.DoesNotExist:

            return Response(
                {
                    "error":
                        "Pharmacy not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        pharmacy.verification_status = "APPROVED"

        pharmacy.rejection_reason = None

        pharmacy.save()

        return Response(
            {
                "message":
                    "Pharmacy approved successfully.",

                "pharmacy_id":
                    pharmacy.id,

                "verification_status":
                    pharmacy.verification_status
            },
            status=status.HTTP_200_OK
        )


# ============================================================
# ADMIN - REJECT
# ============================================================

class AdminRejectPharmacyView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(
        self,
        request,
        pharmacy_id
    ):

        if request.user.role != "admin":

            return Response(
                {
                    "error":
                        "Only admin can reject pharmacies."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        try:

            pharmacy = Pharmacy.objects.get(
                id=pharmacy_id
            )

        except Pharmacy.DoesNotExist:

            return Response(
                {
                    "error":
                        "Pharmacy not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        reason = request.data.get(
            "rejection_reason"
        )

        if not reason:

            return Response(
                {
                    "error":
                        "Rejection reason is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        pharmacy.verification_status = "REJECTED"

        pharmacy.rejection_reason = reason

        pharmacy.save()

        return Response(
            {
                "message":
                    "Pharmacy rejected successfully.",

                "pharmacy_id":
                    pharmacy.id,

                "verification_status":
                    pharmacy.verification_status,

                "rejection_reason":
                    pharmacy.rejection_reason
            },
            status=status.HTTP_200_OK
        )


# ============================================================
# ADMIN - DELETE PHARMACY
# ============================================================

class AdminDeletePharmacyView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def delete(
        self,
        request,
        pharmacy_id
    ):

        if request.user.role != "admin":

            return Response(
                {
                    "error":
                        "Only admin can delete pharmacies."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        try:

            pharmacy = Pharmacy.objects.get(
                id=pharmacy_id
            )

        except Pharmacy.DoesNotExist:

            return Response(
                {
                    "error":
                        "Pharmacy not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        owner = pharmacy.owner

        pharmacy.delete()

        if owner:

            owner.delete()

        return Response(
            {
                "message":
                    "Pharmacy deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT
        )
