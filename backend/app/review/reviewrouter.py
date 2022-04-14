from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from config.database import get_db
from models.usermodels import User
from dto.reviewschema import ReviewCreate
from config.token import get_currentUser
from .reviewservice import ReviewService

from pyabsa import ATEPCCheckpointManager
aspect_extractor = ATEPCCheckpointManager.get_aspect_extractor(checkpoint='F:\\Learning\\NLP\\ecom-fastapi-react-nlp-final-project\\backend\\app\\review\\aimodel',
                                                               auto_device=True  # False means load model on CPU
                                                               )

router = APIRouter(prefix="/review", tags=["Review"])


@router.get("/")
def getAllReview(db: Session = Depends(get_db)):
    return ReviewService.get_all(db=db)


@router.get("/analytics")
def getAllAspectReview(db: Session = Depends(get_db)):
    list_object_review = ReviewService.get_all(db=db)
    list_aspect_review = [i.comment for i in list_object_review]
    atepc_result = aspect_extractor.extract_aspect(inference_source=list_aspect_review,  #
                                                   save_result=False,
                                                   print_result=False,  # print the result
                                                   pred_sentiment=True,  # Predict the sentiment of extracted aspect terms
                                                   )
    return {'analysis': atepc_result, 'review': list_object_review}


@router.post("/create/{productid}")
def createReview(
    productid: int,
    request: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_currentUser),
):
    return ReviewService.create_review(
        request=request, productId=productid, db=db, current_user=current_user
    )


@router.post("/coba")
def cobaReview(request: ReviewCreate):
    return request
